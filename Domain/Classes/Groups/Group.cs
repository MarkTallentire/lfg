using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Domain.Classes.NameGenerators;
using System.Globalization;

namespace Domain.Classes.Groups
{
    public class Group
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public GroupPrivacyLevel PrivacyLevel { get; private set; }

        private List<GroupMember> members;
        public IEnumerable<GroupMember> Members => members;


        private Group()
        {
            members = new List<GroupMember>();
        }

        public Group(string name, string description, GroupPrivacyLevel privacyLevel, string leaderId)
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
            var leader = new GroupMember()
            {
                GroupId = Id,
                UserId = leaderId,
                IsGroupLeader = true
            };
            members = new List<GroupMember> {leader};
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
