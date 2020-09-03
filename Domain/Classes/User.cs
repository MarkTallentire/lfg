using System;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;

namespace Domain.Classes
{
    public class User : IdentityUser
    {
        public DateTime DateOfBirth { get; set; }
        public DateTime TermsAndConditionsAccepted  { get; set; }
        public bool Online { get; set; }
        public bool InPerson { get; set; }
        public Point Location { get; set; }

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
            TermsAndConditionsAccepted = DateTime.Now;
            Online = online;
            InPerson = inPerson;
            Location = location;

        }

        private User(){}
    }
}