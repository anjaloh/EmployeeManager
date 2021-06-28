using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManager.API.Contracts;
using EmployeeManager.API.Entities;
using EmployeeManager.API.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.API.Repository
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await FindAll()
                .Select(employee =>
                    new Employee
                    {
                        Guid = employee.Guid,
                        FirstName = employee.FirstName,
                        LastName = employee.LastName,
                        EmailAddress = employee.EmailAddress,
                        DateOfBirth = employee.DateOfBirth,
                        Age = employee.Age,
                        Salary = employee.Salary,
                        Department = new Department
                        {
                            Id = employee.Department.Id,
                            Guid = employee.Department.Guid,
                            Name = employee.Department.Name,
                            CreatedAt = employee.Department.CreatedAt,
                            UpdatedAt = employee.Department.UpdatedAt
                        },
                        CreatedAt = employee.CreatedAt,
                        UpdatedAt = employee.UpdatedAt
                    }
                ).ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(Guid guid)
        {
            return await FindByCondition(employee => employee.Guid == guid)
                .FirstOrDefaultAsync();
        }

        public async Task<Employee> GetEmployeeWithDetailsAsync(Guid guid)
        {
            return await FindByCondition(employee => employee.Guid == guid)
                .Select(employee =>
                    new Employee
                    {
                        Guid = employee.Guid,
                        FirstName = employee.FirstName,
                        LastName = employee.LastName,
                        EmailAddress = employee.EmailAddress,
                        DateOfBirth = employee.DateOfBirth,
                        Age = employee.Age,
                        Salary = employee.Salary,
                        Department = new Department
                        {
                            Id = employee.Department.Id,
                            Guid = employee.Department.Guid,
                            Name = employee.Department.Name,
                            CreatedAt = employee.Department.CreatedAt,
                            UpdatedAt = employee.Department.UpdatedAt
                        },
                        CreatedAt = employee.CreatedAt,
                        UpdatedAt = employee.UpdatedAt
                    }
                ).FirstOrDefaultAsync();
        }

        public void CreateEmployee(Employee employee)
        {
            Create(employee);
        }

        public void UpdateEmployee(Employee employee)
        {
            Update(employee);
        }

        public void DeleteEmployee(Employee employee)
        {
            Delete(employee);
        }
    }
}