using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Domain.Classes;
using Domain.Classes.Groups;
using Domain.Exceptions;
using NetTopologySuite.Geometries;
using Xunit;

namespace Tests.Unit
{
    public class GroupTests
    {
        [Fact]
        public void random_group_name_generates()
        {
            var groupName = Group.GenerateRandomName();
            Assert.True(!string.IsNullOrWhiteSpace(groupName));
        }

        [Fact]
        public void can_add_friend_to_friend_privacy_level_group()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19),
                true, true, true,
                new Point(1.2f, 1f));

            var user2 = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19),
                true, true, true,
                new Point(1.2f, 1f));

            user.AddFriend(user2.Id);

            var group = new Group("The Murderous Crows", "Unit Test Group", GroupPrivacyLevel.Friends, user, 2, 6);
            group.JoinGroup(user2);

            Assert.Equal(group.Members.Count(), 2);
        }

        [Fact]
        public void cant_add_none_friend_to_friend_privacy_level_group()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19),
                true, true, true,
                new Point(1.2f, 1f));

            var user2 = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19),
                true, true, true,
                new Point(1.2f, 1f));


            var group = new Group("The Murderous Crows", "Unit Test Group", GroupPrivacyLevel.Friends, user, 2, 6);


            Assert.Throws<JoinGroupException>(() => group.JoinGroup(user2));
        }

        [Fact]
        public void group_is_created()
        {
            var user = new User("Olemus", "mark.tallentire@test.com", DateTime.Now.AddYears(-19),
                true, true, true,
                new Point(1.2f, 1f));
            var group = new Group("The Murderous Crows", "Unit test group", GroupPrivacyLevel.Matchmaking, user, 2, 6);

            Assert.True(group.Members.Select(x => x.User).Contains(user));
            Assert.NotNull(group.Name);
            Assert.NotNull(group.Description);
            Assert.NotNull(group.PrivacyLevel);
            Assert.NotEmpty(group.Members);
            Assert.Equal(2, group.MinPlayers);
            Assert.Equal(6, group.MaxPlayers);
        }
    }
}