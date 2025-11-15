using Microsoft.AspNetCore.Mvc;

namespace InvoiceAutomation.DTOs ; 
public class InvoiceUploadModel
{
    [FromForm(Name = "userId")]
    public Guid UserId { get; set; }

    [FromForm(Name = "file")]
    public IFormFile File { get; set; }
}