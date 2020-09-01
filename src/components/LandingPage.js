import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import crown from "../assets/crown.svg";
import cute from "../assets/cute.svg";
import wand from "../assets/wand.svg";
import sword from "../assets/sword.svg";
import knife from "../assets/knife.svg";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    height: "100vh",
  },
  heroContent: { transform: "translateY(-50%)" },
  ctaButtons: {
    paddingTop: theme.spacing(2),
  },
  heroIcon: {
    height: "2em",
    width: "2em",
    [theme.breakpoints.up("sm")]: {
      height: "2.75em",
      width: "2.75em",
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.heroContainer}
    >
      <Grid item className={classes.heroContent}>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item>
            <img src={wand} alt="logo" className={classes.heroIcon} />
          </Grid>
          <Grid item>
            <img src={sword} alt="logo" className={classes.heroIcon} />
          </Grid>
          <Grid item>
            <img src={crown} alt="logo" className={classes.heroIcon} />
          </Grid>
          <Grid item>
            <img src={cute} alt="logo" className={classes.heroIcon} />
          </Grid>
          <Grid item>
            <img src={knife} alt="logo" className={classes.heroIcon} />
          </Grid>
        </Grid>
        <Typography variant="h2" align="center">
          <Typography variant="h2" component="span" color="primary">
            lfg
          </Typography>{" "}
          for the tabletop.
        </Typography>

        <Typography variant="body1" align="center">
          gather your party and venture forth.
        </Typography>

        <Grid
          container
          justify="center"
          align="center"
          spacing={2}
          className={classes.ctaButtons}
        >
          <Grid item>
            <Button component={Link} to="#" variant="outlined" color="primary">
              tell me more
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
            >
              join an adventure
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
