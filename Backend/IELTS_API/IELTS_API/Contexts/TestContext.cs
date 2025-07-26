using IELTS_API.Models;
using Microsoft.EntityFrameworkCore;

namespace IELTS_API.Contexts
{
    public class TestContext : DbContext
    {
        public TestContext(DbContextOptions<TestContext> options) : base(options)
        {
        }

        public DbSet<Test> Tests { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = "Server=localhost;Port=3306;Database=ielts_db;User=root;Password=MySQL2004;";
                optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 42)));
            }
        }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Test>().HasData(
        //        new Test
        //        {
        //            Id = 1,
        //            Name = "IELTS Academic 2019",
        //            Description = "IELTS Academic Test In 2019",
        //            BandLevel = 7.5,
        //            Secret = "ielts-2019"
        //        },
        //        new Test
        //        {
        //            Id = 2,
        //            Name = "IELTS Academic 2020",
        //            Description = "IELTS Academic Test In 2020",
        //            BandLevel = 6.5,
        //            Secret = "ielts-2020"
        //        }
        //    );
        //}
    }
}
