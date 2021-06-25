using System;
using EmployeeManager.API.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.API.Entities
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .Property(e => e.Guid)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Department>()
                .Property(d => d.Guid)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Employee>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Employee>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Department>()
                .Property(d => d.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Department>()
                .Property(d => d.UpdatedAt)
                .HasDefaultValueSql("GETDATE()");

            // Seed
            modelBuilder.Entity<Department>().HasData(
                new Department
                {
                    Id = 1,
                    Name = "IT"
                },
                new Department
                {
                    Id = 2,
                    Name = "HR"
                },
                new Department
                {
                    Id = 3,
                    Name = "Marketing"
                }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    EmailAddress = "john.doe@example.com",
                    DateOfBirth = new DateTime(1997, 08, 06),
                    Age = 24,
                    Salary = 80000.00m,
                    DepartmentId = 1
                },
                new Employee
                {
                    Id = 2,
                    FirstName = "Jane",
                    LastName = "Doe",
                    EmailAddress = "jane.doe@example.com",
                    DateOfBirth = new DateTime(1987, 11, 16),
                    Age = 34,
                    Salary = 120000.00m,
                    DepartmentId = 1
                }
            );
        }
    }
}