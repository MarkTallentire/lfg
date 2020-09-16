using System;
using Domain.Classes.Games;
using Xunit;

namespace Tests.Unit
{
    public class GameTests
    {
        [Fact]
        public void can_add_new_games()
        {
            var game = new Game("Monopoly", 2, 6);
            
            Assert.NotNull(game);
        }

        [Fact]
        public void cannot_add_new_game_with_0_player_requirement()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                new Game("Monopoly", 0, 0);
            });
            
            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                new Game("Monopoly", 0, 1);
            });
            
            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                new Game("Monopoly", 1, 0);
            });
        }

        [Fact]
        public void cannot_add_game_with_more_max_players_than_min()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                new Game("Monopoly", 10, 1);
            });
        }
    }
}