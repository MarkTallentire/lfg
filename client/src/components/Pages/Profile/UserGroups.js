import React from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import crown from "../../../assets/crown.svg";

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

const groups = [
  {
    id: 1,
    name: "The Strong Cacti",
    games: ["Gloomhaven", "Frosthaven"],
    members: ["1", "2", "3"],
    isLeader: false,
    canInvite: false,
  },
  {
    id: 2,
    name: "The Jolly Bards",
    games: ["Dungeons and Dragons 5e"],
    members: ["1", "2", "3"],
    isLeader: true,
    canInvite: true,
  },
];

const UserGroups = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item container justify="flex-end">
        <Grid item>
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            variant="outlined"
            className={classes.sortButton}
          >
            Sort By: Name
          </Button>
          <Button variant="contained" color="primary">
            Create New Group
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container container direction="column" spacing={2}>
          {groups.map((group) => (
            <Grid item key={group.id}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="h5">{group.name}</Typography>
                          <Grid container alignItems="center">
                            {group.isLeader && (
                              <img
                                src={crown}
                                alt="leader crown"
                                className={classes.leaderImage}
                              ></img>
                            )}
                            <Typography variant="subtitle2">
                              {group.members.length} Members
                            </Typography>
                          </Grid>

                          <Typography variant="subtitle2">
                            {group.games.map((game, i) => (
                              <>
                                {game} {i !== group.games.length - 1 && " | "}
                              </>
                            ))}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        {group.canInvite && (
                          <Grid item>
                            <Button variant="contained" color="primary">
                              Invite More Players
                            </Button>
                          </Grid>
                        )}
                        <Grid item>
                          <Button variant="outlined" color="primary">
                            Leave Group
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserGroups;
