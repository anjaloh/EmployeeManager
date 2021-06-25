#nullable enable
using System;

namespace EmployeeManager.API.Entities.DTOs
{
    public class EmployeeUpdateDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? EmailAddress { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Age { get; set; }
        public decimal? Salary { get; set; }
    }
}