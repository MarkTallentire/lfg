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

        private List<Friend> friendTo;
        private List<Friend> friendOf;

        private List<Friend> friends => friendTo.Concat(friendOf).ToList();
        
        public IEnumerable<Friend> FriendTo => friendTo;
        public IEnumerable<Friend> FriendOf => friendOf;
        

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
            if (dateOfBirth > DateTime.Today.AddYears(-13))
            {
                throw new ArgumentOutOfRangeException(nameof(dateOfBirth), "You must be 13 or over to register");
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
            friendTo = new List<Friend>();
            friendOf = new List<Friend>();
            TermsAndConditionsAccepted = DateTime.Now;
            Online = online;
            InPerson = inPerson;
            Location = location;

        }

        /// <summary>
        /// Checks if a user has a friend matching the friendId
        /// </summary>
        /// <param name="friendId">The Id of the user to check for friendship</param>
        /// <returns>
        /// Returns true if this user has a friend matching the id passed in.
        /// Will return true even if the friendship link has not yet been accepted
        /// </returns>
        public bool HasFriend(string friendId)
        {
            return GetFriend(friendId) != null;
        }

        private Friend GetFriend(string friendId)
        {
            bool match = false;
            foreach (var friend in friends)
            {
                if (friend.RequesterId == friendId || friend.ReceiverId == friendId)
                    return friend;
            }

            return null;
        }
        
        public bool AddFriend(string friendId)
        {
            bool match = false;
            
            if (HasFriend(friendId))
                return false;

            var newFriend = new Friend()
            {
                RequesterId = this.Id,
                ReceiverId = friendId,
                IsAccepted = false
            };
            
            friendTo.Add(newFriend);

            return true;

        }
        public void AcceptFriendRequest(string friendId)
        {
            var request = friendOf.SingleOrDefault(x => x.RequesterId == friendId);

            if (request == null)
                return;

            request.IsAccepted = true;
        }
        
        public void RejectFriendRequest(string friendId)
        {
            var request = friends.SingleOrDefault(x => x.RequesterId == friendId);

            if (request == null)
                return;

            friends.Remove(request);
        }
      
        
        public void RemoveFriend(string friendId)
        {
            var friend = GetFriend(friendId);
            if (friend != null)
            {
                if(!friendTo.Remove(friend))
                    friendOf.Remove(friend);
            }
        }
        private User()
        {
            friendOf = new List<Friend>();
            friendTo = new List<Friend>();
        }
    }
}