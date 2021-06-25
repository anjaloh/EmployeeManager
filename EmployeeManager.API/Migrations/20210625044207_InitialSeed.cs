using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeManager.API.Migrations
{
    public partial class InitialSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentId", "DepartmentName" },
                values: new object[] { 1L, "IT" });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentId", "DepartmentName" },
                values: new object[] { 2L, "HR" });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentId", "DepartmentName" },
                values: new object[] { 3L, "Marketing" });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Age", "DateOfBirth", "DepartmentId", "EmailAddress", "FirstName", "LastName", "Salary" },
                values: new object[] { 1L, 24, new DateTime(1997, 8, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 1L, "john.doe@example.com", "John", "Doe", 80000.00m });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Age", "DateOfBirth", "DepartmentId", "EmailAddress", "FirstName", "LastName", "Salary" },
                values: new object[] { 2L, 34, new DateTime(1987, 11, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), 1L, "jane.doe@example.com", "Jane", "Doe", 120000.00m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "EmployeeId",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "EmployeeId",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 1L);
        }
    }
}
