using NetTopologySuite.Geometries;

namespace Domain.Classes.Groups
{
    public class GroupLocation
    {
        public bool isOnline { get; set; }
        public bool isInPerson { get; set; }

        public string OnlineService { get; set; }
        
        public Point Location { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}