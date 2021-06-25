using System.Collections.Generic;
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
                .ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(long id)
        {
            return await FindByCondition(employee => employee.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Employee> GetEmployeeWithDetailsAsync(long id)
        {
            return await FindByCondition(employee => employee.Id == id)
                .Include(employee => employee.Department)
                .FirstOrDefaultAsync();
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