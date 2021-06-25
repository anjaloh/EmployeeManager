using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EmployeeManager.API.Entities.Models;

namespace EmployeeManager.API.Contracts
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(Guid guid);
        Task<Employee> GetEmployeeWithDetailsAsync(Guid guid);
        void CreateEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        void DeleteEmployee(Employee employee);
    }
}