using AutoMapper;
using EmployeeManager.API.Entities.DTOs;
using EmployeeManager.API.Entities.Models;

namespace EmployeeManager.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDto>();
            CreateMap<Employee, EmployeeCreateDto>();
            CreateMap<Employee, EmployeeUpdateDto>();
            CreateMap<Department, DepartmentDto>();
            CreateMap<Department, DepartmentCreateDto>();
        }
    }
}