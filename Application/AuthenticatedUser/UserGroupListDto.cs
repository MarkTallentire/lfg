using System.Collections.Generic;
using Domain.Classes.Groups;

namespace Application.AuthenticatedUser
{
    public class UserGroupListDto
    {
        public string GroupName { get; set; }
        public string Description { get; set; }
        public GroupPrivacyLevel PrivacyLevel { get; set; }
        
        public List<string> MemberIds { get; set; }
    }
}