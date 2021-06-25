using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeManager.API.Contracts;
using EmployeeManager.API.Entities.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.API.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ILoggerManager _logger;

        private readonly IMapper _mapper;

        private readonly IRepositoryWrapper _repository;

        public EmployeeController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var employees = await _repository.Employee.GetAllEmployeesAsync();
                _logger.LogInfo("Fetched all employees from database.");

                var employeeResult = _mapper.Map<IEnumerable<EmployeeDto>>(employees);
                return Ok(employeeResult);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in GetAllEmployees action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}