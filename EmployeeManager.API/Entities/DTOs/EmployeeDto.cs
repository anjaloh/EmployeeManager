using System;
using EmployeeManager.API.Entities.Models;

namespace EmployeeManager.API.Entities.DTOs
{
    public class EmployeeDto
    {
        public long Id { get; set; }
        public Guid Guid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public decimal Salary { get; set; }
        public Department Department { get; set; }
    }
}