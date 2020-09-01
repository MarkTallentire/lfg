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

import faker from "faker";
import { Container } from "@material-ui/core";

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
  groupAvatar: {
    width: "3.5em",
    marginLeft: "30px",
  },
  moreInfoGrid: {
    marginTop: "8em",
  },
  imageGrid: {
    margin: "0 2em",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
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
              <Button
                component={Link}
                to="#"
                variant="outlined"
                color="primary"
              >
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

      <Grid container>
        <Container>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography variant="h3" color="primary">
                  find a group
                </Typography>
                <Typography variant="subtitle1">
                  from beginners to experts, we'll find the right people for you
                </Typography>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.moreInfoGrid}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
            >
              <Grid item className={classes.imageGrid}>
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
                <img
                  src={faker.internet.avatar()}
                  alt="fake avatar"
                  className={classes.groupAvatar}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" color="primary" align="right">
                  agree a safe space
                </Typography>
                <Typography variant="subtitle1" align="right">
                  we work with local game shops to find you and your new group{" "}
                  <br /> a safe space to meet
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default LandingPage;
