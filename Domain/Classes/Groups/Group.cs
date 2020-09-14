using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Domain.Classes.NameGenerators;
using System.Globalization;
using System.Linq;
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

        public Group(string name, string description, GroupPrivacyLevel privacyLevel, string leaderId, int minPlayers, int maxPlayers)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name), "cannot create a group with no name");
            }
            if (string.IsNullOrWhiteSpace(description))
            {
                throw new ArgumentNullException(nameof(description), "cannot create a group with no description");
            }

            if (string.IsNullOrWhiteSpace(leaderId))
            {
                throw new ArgumentNullException(nameof(description), "cannot create a group with no leader");
            }
            
            Name = name;
            Description = description;
            PrivacyLevel = privacyLevel;
            MinPlayers = minPlayers;
            MaxPlayers = maxPlayers;
            
            var leader = new GroupMember()
            {
                GroupId = Id,
                UserId = leaderId,
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
            //If this is a matchmaking group then deny the request, matchmaking will be handled differently.
            if(PrivacyLevel == GroupPrivacyLevel.Matchmaking)
            {
                throw new JoinGroupException("matchmaking groups cannot be joined manually");
            }
            else if (PrivacyLevel == GroupPrivacyLevel.Private)
            {
                //If its private we need to check that the user has an invite and that the invite is valid
                throw new NotImplementedException();
            }
            else if (PrivacyLevel == GroupPrivacyLevel.Friends)
            {
                //If its a Friends only then we need to check that the user is friends with the group leader
                //get the groups leader
                var leader = members.SingleOrDefault(x => x.IsGroupLeader);
                
                //Check if they're friends.
                if (user.FriendTo.Any(x => x.RequesterId == leader.UserId) ||
                    user.FriendTo.Any(x => x.ReceiverId == leader.UserId))
                {
                    members.Add(new GroupMember()
                    {
                        Group = this,
                        IsGroupLeader = false,
                        User = user
                    });
                }
            }
            else if (PrivacyLevel == GroupPrivacyLevel.GroupFriends)
            {
                //if its friends of friends then we need to check that the user is friends with anyone in the group
                throw new NotImplementedException();
            }

            var newMember = new GroupMember()
            {
                UserId = user.Id,
                IsGroupLeader = false,
                GroupId = this.Id
            };

            members.Add(newMember);
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
