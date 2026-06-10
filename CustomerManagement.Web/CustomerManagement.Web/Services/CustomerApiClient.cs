using System.Net.Http.Json;
using CustomerManagement.Web.Models;

namespace CustomerManagement.Web.Services;

public class CustomerApiClient : ICustomerApiClient
{

    private readonly HttpClient _http;

    public CustomerApiClient(HttpClient http) => _http = http;

    public async Task<List<CustomerDto>> GetAllAsync()
    {
        var result = await _http.GetFromJsonAsync<List<CustomerDto>>("api/customers");
        return result ?? new();
    }

    public async Task<CustomerDto?> GetByIdAsync(int id)
    {
        var response = await _http.GetAsync($"api/customers/{id}");
        if (!response.IsSuccessStatusCode) return null;
        return await response.Content.ReadFromJsonAsync<CustomerDto>();
    }

    public async Task<CustomerDto?> CreateAsync(CustomerSaveDto dto)
    {
        var response = await _http.PostAsJsonAsync("api/customers", dto);
        if (!response.IsSuccessStatusCode) return null;
        return await response.Content.ReadFromJsonAsync<CustomerDto>();
    }

    public async Task<bool> UpdateAsync(int id, CustomerSaveDto dto)
    {
        var response = await _http.PutAsJsonAsync($"api/customers/{id}", dto);
        return response.IsSuccessStatusCode;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var response = await _http.DeleteAsync($"api/customers/{id}");
        return response.IsSuccessStatusCode;
    }
}
