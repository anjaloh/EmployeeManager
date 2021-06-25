using System.Collections.Generic;
using System.Threading.Tasks;
using EmployeeManager.API.Entities.Models;

namespace EmployeeManager.API.Contracts
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(long id);
        Task<Employee> GetEmployeeWithDetailsAsync(long id);
        void CreateEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        void DeleteEmployee(Employee employee);
    }
}