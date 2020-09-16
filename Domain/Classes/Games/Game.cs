using System;

namespace Domain.Classes.Games
{
    public class Game
    {
        public int Id { get; private set; }
        public string Name { get; private set; }

        public int MinPlayers { get; private set; }
        public int MaxPlayers { get; private set; }


        public Game(string name, int minPlayers, int maxPlayers)
        {
            if(minPlayers <= 0)
                throw new ArgumentOutOfRangeException(nameof(minPlayers), "Can't create a game that requires no players");
            if(maxPlayers <= 0)
                throw new ArgumentOutOfRangeException(nameof(minPlayers), "Can't create a game that requires no players");
            
            if(maxPlayers < minPlayers)
                throw new ArgumentOutOfRangeException(nameof(maxPlayers), "Can't create a game with max players less than min players");

            Name = name;
            MinPlayers = minPlayers;
            MaxPlayers = maxPlayers;
        }
    }
}