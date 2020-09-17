using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Domain.Classes.Games;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;

namespace Domain.Classes
{
    public class User : IdentityUser
    {
        public DateTime DateOfBirth { get; private set; }
        public DateTime TermsAndConditionsAccepted { get; set; }
        public bool Online { get; private set; }
        public bool InPerson { get; private set; }
        public Point Location { get; private set; }

        private List<Friend> friendTo;
        private List<Friend> friendOf;

        public IEnumerable<Friend> Friends => friendTo.Concat(friendOf).ToList();

        //I'd prefer these weren't exposed because it could be confusing but EF forces me to so that relationships are correct
        //FriendTo is the requesting end, i.e if i request to friend you then that is friend to
        public IEnumerable<Friend> FriendTo => friendTo;

        //Friend of is for the person accepting (or rejecting!) the friend request.
        public IEnumerable<Friend> FriendOf => friendOf;

        public IEnumerable<UserGame> GameCollection => gameCollection;
        private List<UserGame> gameCollection;


        public User(string username, string emailAddress, DateTime dateOfBirth, bool termsandconditionsaccepted,
            bool online, bool inPerson, Point location)
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
                throw new ArgumentNullException(nameof(termsandconditionsaccepted),
                    "Must accept all terms and conditions before registering");
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
            gameCollection = new List<UserGame>();
            TermsAndConditionsAccepted = DateTime.Now;
            Online = online;
            InPerson = inPerson;
            Location = location;
        }

        private User()
        {
            friendOf = new List<Friend>();
            friendTo = new List<Friend>();
            gameCollection = new List<UserGame>();
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
            foreach (var friend in Friends)
            {
                if (friend.RequesterId == friendId || friend.ReceiverId == friendId)
                    return friend;
            }

            return null;
        }

        public bool AddFriend(string friendId)
        {
            if (HasFriend(friendId))
            {
                return false;
            }

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
            var request = Friends.SingleOrDefault(x => x.RequesterId == friendId);

            if (request == null)
                return;

            if (!friendTo.Remove(request))
                friendOf.Remove(request);
        }

        public void RemoveFriend(string friendId)
        {
            var friend = GetFriend(friendId);
            if (friend != null)
            {
                if (!friendTo.Remove(friend))
                    friendOf.Remove(friend);
            }
        }

        public void AddGameToCollection(int gameId, UserSkillLevel skillLevel, UserSkillLevel willingToPlayWith,
            bool ownsAllComponents, bool gameMaster, bool activelyLooking)
        {
            var existingGame = gameCollection.SingleOrDefault(x => x.GameId == gameId);
            if (existingGame != null)
            {
                UpdateGameInCollection(existingGame.Id, skillLevel, willingToPlayWith, ownsAllComponents, gameMaster,
                    activelyLooking);
            }
            else
            {
                var userGame = new UserGame()
                {
                    GameId = gameId,
                    SkillLevel = skillLevel,
                    WillingToPlayWith = willingToPlayWith,
                    OwnsAllComponents = ownsAllComponents,
                    GameMaster = gameMaster,
                    ActivelyLooking = activelyLooking
                };
                
                gameCollection.Add(userGame);
            }

        }

        public void UpdateGameInCollection(long userGameId, UserSkillLevel skillLevel, UserSkillLevel willingToPlayWith,
            bool ownsAllComponents, bool gameMaster, bool activelyLooking)
        {
            var existingGame = gameCollection.SingleOrDefault(x=>x.Id == userGameId);
            existingGame.SkillLevel = skillLevel;
            existingGame.WillingToPlayWith = willingToPlayWith;
            existingGame.OwnsAllComponents = ownsAllComponents;
            existingGame.GameMaster = gameMaster;
            existingGame.ActivelyLooking = activelyLooking;
        }

        public void RemoveGameFromCollection(long userGameId)
        { 
            var existingGame = GameCollection.SingleOrDefault(x=>x.Id == userGameId);
            gameCollection.Remove(existingGame);
        }
    }
}