using System.Threading.Tasks;

namespace EmployeeManager.API.Contracts
{
    public interface IRepositoryWrapper
    {
        IEmployeeRepository Employee { get; }
        IDepartmentRepository Department { get; }
        Task SaveAsync();
    }
}