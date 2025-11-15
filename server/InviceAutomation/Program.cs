using InvoiceAutomation.Data;
using InvoiceAutomation.Interfaces;
using InvoiceAutomation.Services;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

var builder = WebApplication.CreateBuilder(args);

ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHttpClient<IMistralOcrService, MistralOcrService>();
builder.Services.AddHttpClient<IInvoiceAnalysisService, InvoiceAnalysisService>();

builder.Services.AddScoped<IGmailService, GmailService>();
builder.Services.AddScoped<IExcelService, ExcelService>();
builder.Services.AddScoped<IInvoiceProcessingService, InvoiceProcessingService>();
builder.Services.AddHostedService<EmailProcessingService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Apply database migrations automatically
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    
    try
    {
        logger.LogInformation("Starting database migration...");
        
        var context = services.GetRequiredService<ApplicationDbContext>();
        
        // Check if database can be connected
        var canConnect = await context.Database.CanConnectAsync();
        if (!canConnect)
        {
            logger.LogWarning("Cannot connect to database. Retrying in 5 seconds...");
            await Task.Delay(5000);
        }
        
        // Apply pending migrations
        await context.Database.MigrateAsync();
        
        logger.LogInformation("Database migration completed successfully.");
        
        // Optional: Seed initial data
        // await SeedDataAsync(context, logger);
    }
    catch (Npgsql.PostgresException pgEx)
    {
        logger.LogError(pgEx, "PostgreSQL error occurred while migrating the database. Error Code: {ErrorCode}, SQL State: {SqlState}", 
            pgEx.ErrorCode, pgEx.SqlState);
        
        // Don't throw - let the app start so you can diagnose via logs/health checks
        logger.LogWarning("Application will start without migrations applied. Manual intervention may be required.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An unexpected error occurred while migrating the database.");
        
        // For critical failures, you might want to prevent app startup:
        // throw;
        
        // Or allow startup for debugging:
        logger.LogWarning("Application will start despite migration failure. Check logs and database connection.");
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();

