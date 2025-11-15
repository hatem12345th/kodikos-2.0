using Microsoft.EntityFrameworkCore;
using InvoiceAutomation.Models;

namespace InvoiceAutomation.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ProcessedEmail> ProcessedEmails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var seedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.GoogleId)
                .IsUnique();

            modelBuilder.Entity<ProcessedEmail>()
                .HasIndex(pe => pe.GmailId);

            modelBuilder.Entity<ProcessedEmail>()
                .HasOne(pe => pe.User)
                .WithMany(u => u.ProcessedEmails)
                .HasForeignKey(pe => pe.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

