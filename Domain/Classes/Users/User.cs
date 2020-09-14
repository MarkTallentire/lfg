using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;

namespace Domain.Classes
{
    public class User : IdentityUser
    {
        public DateTime DateOfBirth { get; private set; }
        public DateTime TermsAndConditionsAccepted  { get; private set; }
        public bool Online { get; private set; }
        public bool InPerson { get; private set; }
        public Point Location { get; private set; }

        private List<Friend> friends;
        public IEnumerable<Friend> Friends => friends;
        

        public User(string username, string emailAddress, DateTime dateOfBirth, bool termsandconditionsaccepted, bool online, bool inPerson, Point location)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentNullException(nameof(username), "Can't create users with no username");
            }
            if (string.IsNullOrWhiteSpace(emailAddress))
            {
                throw new ArgumentNullException(nameof(emailAddress), "Can't create users with no email address");
            }
            if (dateOfBirth >= DateTime.Today.AddYears(-18))
            {
                throw new ArgumentOutOfRangeException(nameof(dateOfBirth), "You must be 18 or over to register");
            }
            if (!termsandconditionsaccepted)
            {
                throw new ArgumentNullException(nameof(termsandconditionsaccepted), "Must accept all terms and conditions before registering");
            }
            if (!online && !inPerson)
            {
                throw new ArgumentNullException("If not online and not in person then where?");
            }

            if (location.IsEmpty)
            {
                throw new ArgumentNullException(nameof(location), "Location is required to register ");
            }

            UserName = username;
            Email = emailAddress;
            DateOfBirth = dateOfBirth;
            friends = new List<Friend>();
            TermsAndConditionsAccepted = DateTime.Now;
            Online = online;
            InPerson = inPerson;
            Location = location;

        }

        public void AddFriend(string friendId)
        {
            bool match = false;
            foreach (var friend in friends)
            {
                if (friend.User1Id == friendId || friend.User2Id == friendId)
                    match = true;

                if (match)
                    return;
            }

            var newFriend = new Friend()
            {
                User1Id = this.Id,
                User2Id = friendId
            };
            
            friends.Add(newFriend);
        }

        public void RemoveFriend(string friendId)
        {
            foreach (var friend in friends)
            {
                if (friend.User1Id == friendId || friend.User2Id == friendId)
                {
                    friends.Remove(friend);
                    return;
                }
            }
        }
        private User()
        {
            friends = new List<Friend>();
        }
    }
}