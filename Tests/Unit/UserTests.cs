using System;
using System.Linq;
using Domain.Classes;
using NetTopologySuite.Geometries;
using Xunit;

namespace Tests.Unit
{
    public class UserTests
    {
        [Fact]
        public void user_cannot_be_under_13()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => new User("Olemus", "mark.tallentire@test.com", DateTime.Today.AddYears(-11), 
                true, true, true, 
                new Point(1.2f, 1f)));

            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Today.AddYears(-13),
                true, true, true,
                new Point(1.2f, 1f));
            
            Assert.NotNull(user);
        }
        [Fact]
        public void can_add_friend()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            var user2 = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            user.AddFriend(user2.Id);
            
            Assert.NotEmpty(user.FriendTo);
            Assert.False(user.FriendTo.SingleOrDefault(x => x.ReceiverId == user2.Id).IsAccepted);
        }

        [Fact]
        public void cant_duplicate_friends()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            var user2 = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            user.AddFriend(user2.Id);
            user.AddFriend(user2.Id);
            
            
            Assert.NotEmpty(user.FriendTo);
            Assert.NotEqual(user.FriendTo.Count(), 2);
            Assert.False(user.FriendTo.SingleOrDefault(x => x.ReceiverId == user2.Id).IsAccepted);
        }

        [Fact]
        public void can_remove_friends()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            var user2 = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            user.AddFriend(user2.Id);
            user.AddFriend(user2.Id);
            
            
            Assert.NotEmpty(user.FriendTo);
            Assert.NotEqual(user.FriendTo.Count(), 2);
            
            user.RemoveFriend(user2.Id);
            
            Assert.Empty(user.FriendTo);
        }

       
        
        
    }
}