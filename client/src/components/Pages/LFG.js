import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import apiClient from "../../ApiClient";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
  },
  button: {
    margin: "2em",
  },
}));

const LFG = () => {
  const classes = useStyles();

  const onClick = (queueType) => {
    apiClient.post("/groupfinder/users", {
      queueType: queueType === "online" ? 0 : 1,
    });
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <Typography variant="h2" align="center">
          looking for group
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => {
            onClick("online");
          }}
        >
          find an online group
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => {
            onClick("inPerson");
          }}
        >
          find an in person group
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center">
          prefer to do it yourself?
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          component={Link}
          to="/creategroup"
        >
          create a group
        </Button>
      </Grid>
    </Grid>
  );
};

export default LFG;
