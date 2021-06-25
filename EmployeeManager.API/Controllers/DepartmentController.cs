using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeManager.API.Contracts;
using EmployeeManager.API.Entities.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.API.Controllers
{
    [Route("api/v1/departments")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly ILoggerManager _logger;

        private readonly IMapper _mapper;

        private readonly IRepositoryWrapper _repository;

        public DepartmentController(ILoggerManager logger, IMapper mapper, IRepositoryWrapper repository)
        {
            _logger = logger;
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartments(bool minimal)
        {
            try
            {
                var departments = await _repository.Department.GetAllDepartmentsAsync();
                _logger.LogInfo("Fetched all departments from database.");

                if (minimal)
                {
                    var departmentMinimalResult = _mapper.Map<IEnumerable<DepartmentMinimalDto>>(departments);
                    return Ok(departmentMinimalResult);
                }

                var departmentResult = _mapper.Map<IEnumerable<DepartmentDto>>(departments);
                return Ok(departmentResult);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong in GetAllDepartments action: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}