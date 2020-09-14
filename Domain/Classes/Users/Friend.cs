namespace Domain.Classes
{
    public class Friend
    {
        public string RequesterId { get; set; }
        public User Requester { get; set; }
        
        public string ReceiverId { get; set; }
        public User Receiver { get; set; }
        
        
        public bool IsAccepted { get; set; }
    }
}