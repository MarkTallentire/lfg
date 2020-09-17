import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

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
        <Button color="primary" variant="contained" className={classes.button}>
          find an online group
        </Button>
        <Button color="primary" variant="contained" className={classes.button}>
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
