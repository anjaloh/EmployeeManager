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
            CreateMap<Employee, EmployeeWithDetailsDto>();
            CreateMap<Employee, EmployeeCreateDto>();
            CreateMap<EmployeeCreateDto, Employee>();
            CreateMap<Employee, EmployeeUpdateDto>();
            CreateMap<EmployeeUpdateDto, Employee>();
            CreateMap<Department, DepartmentDto>();
            CreateMap<Department, DepartmentMinimalDto>();
            CreateMap<Department, DepartmentCreateDto>();
        }
    }
}