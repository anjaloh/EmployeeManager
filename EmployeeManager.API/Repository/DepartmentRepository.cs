using EmployeeManager.API.Contracts;
using EmployeeManager.API.Entities;
using EmployeeManager.API.Entities.Models;

namespace EmployeeManager.API.Repository
{
    public class DepartmentRepository : RepositoryBase<Department>, IDepartmentRepository
    {
        public DepartmentRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}