using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeManager.API.Contracts;
using EmployeeManager.API.Entities.DTOs;
using EmployeeManager.API.Entities.Models;
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

                var employeeResult = _mapper.Map<IEnumerable<EmployeeWithDetailsDto>>(employees);
                return Ok(employeeResult);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in GetAllEmployees action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id:guid}", Name = "EmployeeById")]
        public async Task<IActionResult> GetEmployeeById(Guid id)
        {
            try
            {
                var employee = await _repository.Employee.GetEmployeeByIdAsync(id);

                if (employee == null)
                {
                    _logger.LogError($"Employee with ID: {id} has not found in database.");
                    return NotFound($"No Employee record found for ID {id}");
                }

                _logger.LogInfo($"Fetched employee with ID: {id}");
                var employeeResult = _mapper.Map<EmployeeDto>(employee);
                return Ok(employeeResult);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in GetEmployeeById action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id:guid}/department")]
        public async Task<IActionResult> GetEmployeeWithDetails(Guid id)
        {
            try
            {
                var employee = await _repository.Employee.GetEmployeeWithDetailsAsync(id);

                if (employee == null)
                {
                    _logger.LogError($"Employee with ID: {id} has not found in database.");
                    return NotFound($"No Employee record found for ID {id}");
                }

                _logger.LogInfo($"Fetched employee with ID: {id}");
                var employeeResult = _mapper.Map<EmployeeWithDetailsDto>(employee);
                return Ok(employeeResult);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in GetEmployeeById action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeCreateDto employee)
        {
            try
            {
                if (employee == null)
                {
                    _logger.LogError("Employee object sent from client is null.");
                    return BadRequest("Employee object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Employee object sent from client is invalid.");
                    return BadRequest("Employee object is invalid");
                }

                var employeeEntity = _mapper.Map<Employee>(employee);

                _repository.Employee.CreateEmployee(employeeEntity);
                await _repository.SaveAsync();

                var createdEmployee = _mapper.Map<EmployeeDto>(employeeEntity);

                return CreatedAtRoute("EmployeeById", new {id = createdEmployee.Guid}, createdEmployee);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in CreateEmployee action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateEmployee(Guid id, [FromBody] EmployeeUpdateDto employee)
        {
            try
            {
                if (employee == null)
                {
                    _logger.LogError("Employee object sent from client is null.");
                    return BadRequest("Employee object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Employee object sent from client is invalid.");
                    return BadRequest("Employee object is invalid");
                }

                var employeeEntity = await _repository.Employee.GetEmployeeByIdAsync(id);
                if (employeeEntity == null)
                {
                    _logger.LogError($"Employee with ID: {id} has not found in database.");
                    return NotFound($"No Employee record found for ID {id}");
                }

                _mapper.Map(employee, employeeEntity);

                _repository.Employee.UpdateEmployee(employeeEntity);
                await _repository.SaveAsync();

                var updatedEmployee = _mapper.Map<EmployeeDto>(employeeEntity);

                return AcceptedAtRoute("EmployeeById", new {id = updatedEmployee.Guid}, updatedEmployee);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in UpdateEmployee action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            try
            {
                var employee = await _repository.Employee.GetEmployeeByIdAsync(id);
                if (employee == null)
                {
                    _logger.LogError($"Employee with ID: {id} has not found in database.");
                    return NotFound($"No Employee record found for ID {id}");
                }

                _repository.Employee.DeleteEmployee(employee);
                await _repository.SaveAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in DeleteEmployee action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}