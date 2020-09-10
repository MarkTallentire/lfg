import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  noGroupContainer: {
    minHeight: "100vh",
    textAlign: "center",
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

const MyGroups = () => {
  const classes = useStyle();
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.noGroupContainer}
    >
      <Typography variant="body1">
        looks like you don't have any groups yet :( <br />
        <Link to="/creategroup" className={classes.link}>
          create a private one now
        </Link>{" "}
        or{" "}
        <Link to="/findgroups" className={classes.link}>
          use the matchmaker
        </Link>
      </Typography>
    </Grid>
  );
};

export default MyGroups;
