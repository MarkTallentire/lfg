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
        public void can_add_friend()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            var user2 = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            user.AddFriend(user2.Id);
            
            Assert.NotEmpty(user.Friends);
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
            
            
            Assert.NotEmpty(user.Friends);
            Assert.NotEqual(user.Friends.Count(), 2);
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
            
            
            Assert.NotEmpty(user.Friends);
            Assert.NotEqual(user.Friends.Count(), 2);
            
            user.RemoveFriend(user2.Id);
            
            Assert.Empty(user.Friends);
        }
    }
}