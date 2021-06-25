using System.ComponentModel.DataAnnotations;

namespace EmployeeManager.API.Entities.DTOs
{
    public class DepartmentCreateDto
    {
        [Required(ErrorMessage = "Department name is required")]
        public string Name { get; set; }
    }
}