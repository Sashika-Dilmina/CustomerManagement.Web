using CustomerManagement.Web.Models;
using CustomerManagement.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagement.Web.Controllers;
    public class CustomersController : Controller
    {
    private readonly ICustomerApiClient _api;

    public CustomersController(ICustomerApiClient api) => _api = api;

    public IActionResult Index() => View();


    [HttpGet]
    public async Task<IActionResult> List()
        => Json(await _api.GetAllAsync());

    [HttpGet]
    public async Task<IActionResult> Get(int id)
    {
        var customer = await _api.GetByIdAsync(id);
        return customer is null ? NotFound() : Json(customer);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CustomerSaveDto dto)
    {
        try
        {
            var created = await _api.CreateAsync(dto);

            if (created is null)
                return StatusCode(500, "API returned unsuccessful response");

            return Json(created);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(int id, [FromBody] CustomerSaveDto dto)
    {
        var ok = await _api.UpdateAsync(id, dto);
        return ok ? Ok() : NotFound();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _api.DeleteAsync(id);
        return ok ? Ok() : NotFound();
    }
}

