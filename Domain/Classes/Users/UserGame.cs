using Domain.Classes.Games;

namespace Domain.Classes
{
    public class UserGame
    {
        public long Id { get; set; }
        
        public Game Game { get; set; }
        public int GameId { get; set; }

        
        /// <summary>
        /// Defines the users current skill level 
        /// </summary>
        public UserSkillLevel SkillLevel { get; set; }
        
        /// <summary>
        /// Defines the skill level of players this user is willing to play with for this game (Advanced players might not be happy playing with beginners)
        /// </summary>
        public UserSkillLevel WillingToPlayWith { get; set; }

        public bool OwnsAllComponents { get; set; }
        public bool GameMaster { get; set; }

        public bool ActivelyLooking { get; set; }
    }
}