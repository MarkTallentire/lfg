using System.Collections.Generic;
using NetTopologySuite.Triangulate.QuadEdge;

namespace Domain.Classes.GroupFinder
{
    /// <summary>
    /// The group finder is responsible for maintaining the queue of users looking for a group via an automated group finder
    /// For the actual groupfinding algorithm we need to access the database so this can be found in the groupfinder domain service instead.
    /// </summary>
    public class GroupFinder
    {
        public int Id { get; set; }
        public string Name { get; private set; }
        public QueueType QueueType { get; private set; }

        private List<GroupFinderRequest> queue;
        public IEnumerable<GroupFinderRequest> Queue => queue;

        
        /// <summary>
        /// Queues should be kept to a minimum (When starting I'm only using 2 queues, online or in person)
        /// to avoid fragmentation of what is likely to be a relatively small user base
        /// The matchmakingrequest object will be used to keep track of preferences on games, skill level etc.. not the queue.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="queueType"></param>
        public GroupFinder(string name, QueueType queueType)
        {
            queue = new List<GroupFinderRequest>();
            Name = name;
            QueueType = queueType;
        }

        public void AddToQueue(GroupFinderRequest request)
        {
            
            //User is already in the queue, we dont need to do anything
            if (queue.Contains(request))
                return;
            
            queue.Add(request);
        }

        public void RemoveFromQueue(GroupFinderRequest request)
        {
            if (!queue.Contains(request))
                return;

            queue.Remove(request);
        }
    }

    public enum QueueType
    {
        Online,
        InPerson
    }
}