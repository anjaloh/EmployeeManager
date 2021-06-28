using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeManager.API.Migrations
{
    public partial class InitialTriggers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Triggers: onUpdate
            migrationBuilder.Sql(@"
                CREATE TRIGGER [dbo].[Employees_UPDATE_UPDATEDAT] ON [dbo].[Employees]
                    AFTER UPDATE
                AS
                BEGIN
                    SET NOCOUNT ON;

                    IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

                    DECLARE @Id INT

                    SELECT @Id = INSERTED.EmployeeId
                    FROM INSERTED

                    UPDATE dbo.Employees
                    SET UpdatedAt = GETDATE()
                    WHERE EmployeeId = @Id
                END
            ");
            
            migrationBuilder.Sql(@"
                CREATE TRIGGER [dbo].[Departments_UPDATE_UPDATEDAT] ON [dbo].[Departments]
                    AFTER UPDATE
                AS
                BEGIN
                    SET NOCOUNT ON;

                    IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

                    DECLARE @Id INT

                    SELECT @Id = INSERTED.DepartmentId
                    FROM INSERTED

                    UPDATE dbo.Departments
                    SET UpdatedAt = GETDATE()
                    WHERE DepartmentId = @Id
                END
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DROP TRIGGER [dbo].[Employees_UPDATE_UPDATEDAT]
            ");
            
            migrationBuilder.Sql(@"
                DROP TRIGGER [dbo].[Departments_UPDATE_UPDATEDAT]
            ");
        }
    }
}
