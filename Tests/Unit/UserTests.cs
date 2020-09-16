using System;
using System.Linq;
using Domain.Classes;
using Domain.Classes.Games;
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
            
            Assert.NotEmpty(user.Friends);
            Assert.False(user.Friends.SingleOrDefault(x => x.ReceiverId == user2.Id).IsAccepted);
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
            Assert.False(user.Friends.SingleOrDefault(x => x.ReceiverId == user2.Id).IsAccepted);
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

        [Fact]
        public void can_add_game_to_collection()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            var game = new Game("Monopoly", 1, 6);
            user.AddGameToCollection(game.Id, UserSkillLevel.Beginner, UserSkillLevel.Advanced, true, false, true);
            
            Assert.NotEmpty(user.GameCollection);
        }

        [Fact]
        public void can_remove_game_from_collection()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            var game = new Game("Monopoly", 1, 6);
            user.AddGameToCollection(game.Id, UserSkillLevel.Beginner, UserSkillLevel.Advanced, true, false, true);
            
            Assert.NotEmpty(user.GameCollection);
            
            user.RemoveGameFromCollection(user.GameCollection.FirstOrDefault().Id);
            Assert.Empty(user.GameCollection);
        }

        [Fact]
        public void can_update_game_in_collection()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19), 
                true, true, true, 
                new Point(1.2f, 1f));
            
            var game = new Game("Monopoly", 1, 6);
            user.AddGameToCollection(game.Id, UserSkillLevel.Beginner, UserSkillLevel.Advanced, true, false, true);
            Assert.NotEmpty(user.GameCollection);
            
            user.UpdateGameInCollection(user.GameCollection.FirstOrDefault().Id, UserSkillLevel.Advanced, UserSkillLevel.Advanced, true, true, true);
            
            Assert.Equal(user.GameCollection.FirstOrDefault().SkillLevel, UserSkillLevel.Advanced);
        }


    }
}