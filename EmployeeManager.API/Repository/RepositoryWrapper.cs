using System.Threading.Tasks;
using EmployeeManager.API.Contracts;
using EmployeeManager.API.Entities;

namespace EmployeeManager.API.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _repositoryContext;
        private IDepartmentRepository _department;
        private IEmployeeRepository _employee;

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public IEmployeeRepository Employee
        {
            get
            {
                if (_employee == null) _employee = new EmployeeRepository(_repositoryContext);

                return _employee;
            }
        }

        public IDepartmentRepository Department
        {
            get
            {
                if (_department == null) _department = new DepartmentRepository(_repositoryContext);

                return _department;
            }
        }

        public async Task SaveAsync()
        {
            await _repositoryContext.SaveChangesAsync();
        }
    }
}