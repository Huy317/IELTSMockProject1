using IELTS_API.Models;
using Microsoft.EntityFrameworkCore;

namespace IELTS_API.Contexts
{
    public class CategoryContext: DbContext
    {
        public CategoryContext(DbContextOptions<CategoryContext> options) : base(options) { }
        public DbSet<Category> Categories { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().ToTable("Categories");
        }
    }
}
