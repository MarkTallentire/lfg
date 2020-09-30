import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: { padding: theme.spacing(2) },
  button: {
    marginTop: "1em",
  },
  leaderImage: {
    height: "2em",
    width: "2em",
    marginRight: ".25em",
  },
  sortButton: {
    marginRight: "1em",
  },
}));

const games = [
  {
    id: 1,
    name: "Dungeons and Dragons 5e",
    skillLevel: "Beginner",
    willingToPlayWith: "Beginner",
    ownsAllComponents: false,
    gameMaster: false,
    activelyLooking: false,
  },
  {
    id: 2,
    name: "Unlock! Secret Adventures",
    skillLevel: "Advanced",
    willingToPlayWith: "Beginner",
    ownsAllComponents: true,
    gameMaster: true,
    activelyLooking: true,
  },
];

const UserGames = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item container justify="flex-end">
        <Button
          endIcon={<KeyboardArrowDownIcon />}
          variant="outlined"
          className={classes.sortButton}
        >
          Sort By: Name
        </Button>
        <Button variant="contained" color="primary">
          Add Game
        </Button>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} key={game.id}>
            <Paper className={classes.paper}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h5">{game.name}</Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="subtitle2">
                        Skill Level: {game.skillLevel}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        Will Play With: {game.willingToPlayWith}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        Leader/GameMaster? {game.gameMaster.toString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    {game.activelyLooking ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        LFG
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                      >
                        Not LFG
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default UserGames;
