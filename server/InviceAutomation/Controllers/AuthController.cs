using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using InvoiceAutomation.Data;
using InvoiceAutomation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvoiceAutomation.Controllers ; 

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpGet("google-login")]
        public IActionResult GoogleLogin()
        {
            var clientId = _configuration["Google:ClientId"];
            var redirectUri = _configuration["Google:RedirectUri"];
            
            var authUrl = $"https://accounts.google.com/o/oauth2/v2/auth?" +
                         $"client_id={clientId}&" +
                         $"redirect_uri={Uri.EscapeDataString(redirectUri)}&" +
                         $"response_type=code&" +
                         $"scope={Uri.EscapeDataString("https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify openid email profile")}&" +
                         $"access_type=offline&" +
                         $"prompt=consent";

            return Ok(new { authUrl });
        }

        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback([FromQuery] string code)
        {
            if (string.IsNullOrEmpty(code))
                return BadRequest("Authorization code is missing");

            try
            {
                var clientId = _configuration["Google:ClientId"];
                var clientSecret = _configuration["Google:ClientSecret"];
                var redirectUri = _configuration["Google:RedirectUri"];

                var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
                {
                    ClientSecrets = new ClientSecrets
                    {
                        ClientId = clientId,
                        ClientSecret = clientSecret
                    },
                    Scopes = new[] { 
                        "https://www.googleapis.com/auth/gmail.readonly",
                        "https://www.googleapis.com/auth/gmail.modify",
                        "openid",
                        "email",
                        "profile"
                    }
                });

                var token = await flow.ExchangeCodeForTokenAsync(
                    "user",
                    code,
                    redirectUri,
                    CancellationToken.None);

                var credential = GoogleCredential.FromAccessToken(token.AccessToken);
                var oauth2Service = new Google.Apis.Oauth2.v2.Oauth2Service(
                    new Google.Apis.Services.BaseClientService.Initializer
                    {
                        HttpClientInitializer = credential
                    });

                var userInfo = await oauth2Service.Userinfo.Get().ExecuteAsync();

                var user = await _dbContext.Users
                    .FirstOrDefaultAsync(u => u.GoogleId == userInfo.Id);

                if (user == null)
                {
                    user = new User
                    {
                        Email = userInfo.Email,
                        GoogleId = userInfo.Id,
                        GoogleAccessToken = token.AccessToken,
                        GoogleRefreshToken = token.RefreshToken,
                        TokenExpiry = DateTime.UtcNow.AddSeconds(token.ExpiresInSeconds ?? 3600)
                    };
                    _dbContext.Users.Add(user);
                }
                else
                {
                    user.GoogleAccessToken = token.AccessToken;
                    if (!string.IsNullOrEmpty(token.RefreshToken))
                        user.GoogleRefreshToken = token.RefreshToken;
                    user.TokenExpiry = DateTime.UtcNow.AddSeconds(token.ExpiresInSeconds ?? 3600);
                    user.LastLogin = DateTime.UtcNow;
                }

                await _dbContext.SaveChangesAsync();

                return Ok(new 
                { 
                    message = "Authentication successful",
                    userId = user.Id,
                    email = user.Email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("status/{userId}")]
        public async Task<IActionResult> GetAuthStatus(Guid userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            
            if (user == null)
                return NotFound();

            return Ok(new
            {
                isAuthenticated = !string.IsNullOrEmpty(user.GoogleAccessToken),
                email = user.Email,
                tokenExpiry = user.TokenExpiry
            });
        }

        


        [HttpGet("users")]
        public async Task<IActionResult> GetAuthenticatedUsers()
        {
            var authenticatedUsers = await _dbContext.Users
                .Where(u => !string.IsNullOrEmpty(u.GoogleRefreshToken))
                .Select(u => new { u.Id, u.Email })
                .ToListAsync();

            if (!authenticatedUsers.Any())
            {
                return NotFound("No authenticated users found.");
            }

            return Ok(authenticatedUsers);
        }

        [HttpPost("logout/{userId}")]
        public async Task<IActionResult> Logout(int userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null || string.IsNullOrEmpty(user.GoogleRefreshToken))
            {
                return BadRequest("User not found or is not authenticated.");
            }
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"https://oauth2.googleapis.com/revoke?token={user.GoogleRefreshToken}");
            }

            user.GoogleAccessToken = null;
            user.GoogleRefreshToken = null;
            user.TokenExpiry = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = $"User {user.Email} has been logged out and token has been revoked." });
        }

        [HttpGet("download-log")]
        public async Task<IActionResult> DownloadInvoiceLog()
        {
            var excelLogFileName = "Invoice_Log.xlsx";
            var excelLogFilePath = Path.Combine(Directory.GetCurrentDirectory(), excelLogFileName);

            if (!System.IO.File.Exists(excelLogFilePath))
            {
                return NotFound(new { message = "The invoice log file was not found. Please process an invoice first to generate the file." });
            }

            try
            {
                var fileBytes = await System.IO.File.ReadAllBytesAsync(excelLogFilePath);
                var mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                return File(fileBytes, mimeType, excelLogFileName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while reading the file.", details = ex.Message });
            }
        }
    }


