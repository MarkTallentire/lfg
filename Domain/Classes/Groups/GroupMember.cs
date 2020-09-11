using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Classes.Groups
{
    public class GroupMember
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }


        public bool IsGroupLeader { get; set; }
    }
}
