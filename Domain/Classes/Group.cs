using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Classes
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public GroupPrivacyLevel PrivacyLevel { get; set; }
    }
}
