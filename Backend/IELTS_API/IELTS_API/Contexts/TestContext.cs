using IELTS_API.Models;
using Microsoft.EntityFrameworkCore;

public class TestContext : DbContext
{
    public TestContext(DbContextOptions<TestContext> options) : base(options) { }

    public DbSet<Test> Tests { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Test>().ToTable("Tests");
    }
}