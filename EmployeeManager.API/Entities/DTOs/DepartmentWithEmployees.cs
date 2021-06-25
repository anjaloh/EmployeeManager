using System;
using System.Collections.Generic;

namespace EmployeeManager.API.Entities.DTOs
{
    public class DepartmentWithEmployees : DTimestamps
    {
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public IEnumerable<EmployeeDto> Employees { get; set; }
    }
}