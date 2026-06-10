using CustomerManagement.Web.Models;

namespace CustomerManagement.Web.Services;

public interface ICustomerApiClient
{
    Task<List<CustomerDto>> GetAllAsync();
    Task<CustomerDto?> GetByIdAsync(int id);
    Task<CustomerDto?> CreateAsync(CustomerSaveDto dto);
    Task<bool> UpdateAsync(int id, CustomerSaveDto dto);
    Task<bool> DeleteAsync(int id);
}
