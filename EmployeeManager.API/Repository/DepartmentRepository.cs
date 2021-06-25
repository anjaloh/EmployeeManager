using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EmployeeManager.API.Contracts;
using EmployeeManager.API.Entities;
using EmployeeManager.API.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.API.Repository
{
    public class DepartmentRepository : RepositoryBase<Department>, IDepartmentRepository
    {
        public DepartmentRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
        
        public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
        {
            return await FindAll()
                .ToListAsync();
        }

        public Task<Department> GetDepartmentByIdAsync(Guid guid)
        {
            throw new NotImplementedException();
        }

        public Task<Department> GetDepartmentWithDetailsAsync(Guid guid)
        {
            throw new NotImplementedException();
        }

        public void CreateDepartment(Department department)
        {
            throw new NotImplementedException();
        }

        public void UpdateDepartment(Department department)
        {
            throw new NotImplementedException();
        }

        public void DeleteDepartment(Department department)
        {
            throw new NotImplementedException();
        }
    }
}