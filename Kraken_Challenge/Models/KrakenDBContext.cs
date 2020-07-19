using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Kraken_Challenge.Models
{
    public partial class krakenDBContext : DbContext
    {
        public krakenDBContext()
        {
        }

        public krakenDBContext(DbContextOptions<krakenDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Vitals> Vitals { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlite("Data Source=.\\AppData\\krakenDB.db;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Email).IsRequired();

                entity.Property(e => e.IsActive).HasDefaultValueSql("1");

                entity.Property(e => e.Password).IsRequired();
            });

            modelBuilder.Entity<Vitals>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BusinessUnitId).HasColumnName("businessUnitId");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("'datetime(''now'')'");

                entity.Property(e => e.DeviceId).HasColumnName("DeviceID");

                entity.Property(e => e.HeartRate)
                    .IsRequired()
                    .HasColumnType("NUMERIC")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.IsActive).HasDefaultValueSql("1");

                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");

                entity.Property(e => e.Tempreture)
                    .IsRequired()
                    .HasColumnType("NUMERIC")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
