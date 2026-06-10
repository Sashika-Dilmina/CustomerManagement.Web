namespace CustomerManagement.Web.Models;

public class CustomerSaveDto
{
    public string CustomerName { get; set; } = string.Empty;
    public string? Address { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string CustomerType { get; set; } = "Personal";
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public bool IsActive { get; set; } = true;

}
