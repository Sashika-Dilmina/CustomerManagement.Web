namespace CustomerManagement.Web.Models;

public class CustomerDto
{
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerCode { get; set; } = string.Empty;
    public string? Address { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string CustomerType { get; set; } = string.Empty;
    public string CustomerTypeName { get; set; } = string.Empty;
    public string? Email {  get; set; }
    public string? PhoneNumber { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
}
