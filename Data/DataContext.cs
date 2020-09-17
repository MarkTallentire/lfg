using Domain.Classes;
using Domain.Classes.GroupFinder;
using Domain.Classes.Groups;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasPostgresExtension("postgis");

            builder.Entity<User>().Ignore(x => x.Friends);
            builder.Entity<GroupMember>().HasKey(x => new {x.GroupId, x.UserId});
            builder.Entity<Friend>(x =>
            {
                x.HasKey(x => new {x.ReceiverId, x.RequesterId});

                x.HasOne(x => x.Requester)
                    .WithMany(x => x.FriendTo)
                    .HasForeignKey(x => x.RequesterId)
                    .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(x => x.Receiver)
                    .WithMany(x => x.FriendOf)
                    .HasForeignKey(x => x.ReceiverId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupFinder> GroupFinder { get; set; }
    }
}