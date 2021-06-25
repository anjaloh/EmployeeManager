using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManager.API.Entities.Models
{
    [Table("Departments")]
    public class Department : ModelBase
    {
        [Key]
        [Column("DepartmentId")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Column("DepartmentGuid")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; }

        [Column("DepartmentName")]
        [Required(ErrorMessage = "Department name is required")]
        public string Name { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}