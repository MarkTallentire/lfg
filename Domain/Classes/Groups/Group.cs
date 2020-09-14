using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Domain.Classes.NameGenerators;
using System.Globalization;
using System.Linq;
using System.Threading;
using Domain.Exceptions;
using NetTopologySuite.Geometries;

namespace Domain.Classes.Groups
{
    public class Group
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public GroupPrivacyLevel PrivacyLevel { get; private set; }

        public int MinPlayers { get; private set; }
        public int MaxPlayers { get; private set; }

        private List<GroupMember> members;
        public IEnumerable<GroupMember> Members => members;


        private Group()
        {
            members = new List<GroupMember>();
        }

        public Group(string name, string description, GroupPrivacyLevel privacyLevel, User groupLeader, int minPlayers,
            int maxPlayers)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name), "cannot create a group with no name");
            }

            if (string.IsNullOrWhiteSpace(description))
            {
                throw new ArgumentNullException(nameof(description), "cannot create a group with no description");
            }

            if (groupLeader == null)
            {
                throw new ArgumentNullException(nameof(groupLeader), "cannot create a group with no leader");
            }

            Name = name;
            Description = description;
            PrivacyLevel = privacyLevel;
            MinPlayers = minPlayers;
            MaxPlayers = maxPlayers;

            var leader = new GroupMember()
            {
                GroupId = Id,
                User = groupLeader,
                IsGroupLeader = true
            };
            members = new List<GroupMember> {leader};
        }

        /// <summary>
        /// Adds a new user to the group
        /// </summary>
        /// <param name="UserId"></param>
        public void JoinGroup(User user)
        {
            if (members.Count == MaxPlayers)
                throw new JoinGroupException("group is full");

            if (members.Any(x => x.UserId == user.Id))
                return;

            //To join a group we have to check permissions first.
            if (!CheckJoinPermissions(user))
                throw new JoinGroupException("cannot join group due to it's privacy settings");

            var newMember = new GroupMember()
            {
                IsGroupLeader = false,
                UserId = user.Id,
                Group = this
            };
            members.Add(newMember);
        }

        private bool CheckJoinPermissions(User user)
        {
            //If this is a matchmaking group then deny the request, matchmaking will be handled differently.

            switch (PrivacyLevel)
            {
                case GroupPrivacyLevel.Matchmaking:
                    return false;
                case GroupPrivacyLevel.Friends:
                    var leader = members.SingleOrDefault(x => x.IsGroupLeader);
                    return leader.User.HasFriend(user.Id);
                case GroupPrivacyLevel.GroupFriends:
                    foreach (var member in members)
                    {
                        if (member.User.HasFriend(user.Id))
                            return true;
                    }
                    return false;
                case GroupPrivacyLevel.Private:
                    return false;


                default: return false;
            }
        }

        public static string GenerateRandomName()
        {
            //The + Adjective + plural noun
            //TODO:: give more options
            var random = new Random();

            var adjective = WordList.Adjectives[random.Next(WordList.Adjectives.Count)];
            var properCaseAdjective = $"{adjective.ToUpper()[0]}{adjective.Substring(1)}";
            var pluralNoun = WordList.PluralNouns[random.Next(WordList.PluralNouns.Count)];
            var properCasePluralNoun = $"{pluralNoun.ToUpper()[0]}{pluralNoun.Substring(1)}";

            return $"The {properCaseAdjective} {properCasePluralNoun}";
        }
    }
}