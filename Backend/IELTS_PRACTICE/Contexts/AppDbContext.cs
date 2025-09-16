﻿using IELTS_PRACTICE.Models;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PRACTICE.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<StudentMetaData> StudentMetaDatas { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestSubmission> TestSubmissions { get; set; }
        public DbSet<TestSubmissionDetail> TestSubmissionDetails { get; set; }
        public DbSet<TypeSkill> TypeSkills { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.TestSubmissions)
                .WithOne(ts => ts.User)
                .HasForeignKey(ts => ts.UserId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.StudentMetaData)
                .WithOne(mt => mt.User)
                .HasForeignKey<StudentMetaData>(mt => mt.UserId);

            modelBuilder.Entity<Question>()
                .HasOne(q => q.Test)
                .WithMany(t => t.Questions)
                .HasForeignKey(q => q.TestId);

            //modelBuilder.Entity<Question>()
            //    .HasOne(q => q.TypeSkill)
            //    .WithMany(t => t.Questions)
            //    .HasForeignKey(q => q.TypeId);

            modelBuilder.Entity<Test>()
                .HasMany(t => t.TestSubmissions)
                .WithOne(ts => ts.Test)
                .HasForeignKey(ts => ts.TestId);

            modelBuilder.Entity<Test>()
                .HasOne(t => t.TypeSkill)
                .WithMany(ts => ts.Tests)
                .HasForeignKey(t => t.TypeId);

            modelBuilder.Entity<TestSubmission>()
                .HasOne(ts => ts.TestSubmissionDetail)
                .WithOne(tsd => tsd.TestSubmission)
                .HasForeignKey<TestSubmissionDetail>(tsd => tsd.SubmissionId);
        }
    }
}
