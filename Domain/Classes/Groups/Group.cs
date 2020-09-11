using System;
using System.Collections.Generic;
using Domain.Classes.NameGenerators;
using System.Globalization;

namespace Domain.Classes.Groups
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public GroupPrivacyLevel PrivacyLevel { get; set; }
        public List<GroupMember> Members { get; set; }
        



        public static string GenerateRandomName()
        {
            //2 options
            //The + Adjective + plural noun
            //or
            //noun + of the + adjective


            var random = new Random();


            var adjective = WordList.Adjectives[random.Next(WordList.Adjectives.Count)];
            var properCaseAdjective = $"{adjective.ToUpper()[0]}{adjective.Substring(1)}";
            var pluralNoun = WordList.PluralNouns[random.Next(WordList.PluralNouns.Count)];
            var properCasePluralNoun = $"{pluralNoun.ToUpper()[0]}{pluralNoun.Substring(1)}";

            return $"The {properCaseAdjective} {properCasePluralNoun}";




        }
    }
}
