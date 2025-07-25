using IELTS_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

public class TestContextFactory : IDesignTimeDbContextFactory<TestContext>
{
    public TestContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TestContext>();
        var connectionString = "Server=localhost;Port=3306;Database=ielts_db;User=root;Password=MySQL2004;";
        optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 42)));

        return new TestContext(optionsBuilder.Options);
    }
}