import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import RedditIcon from "@material-ui/icons/Reddit";

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.text.primary}`,
    width: "100%",
  },
  mainContainer: {},
  link: {
    ...theme.typography.tab,
    color: "inherit",
    textDecoration: "none",
  },
  gridItem: {
    margin: "3em",
  },
  social: {
    height: "1em",
    textDecoration: "none",
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
      height: "1.5em",
      width: "1.5em",
    },
  },
  socialContainer: {
    marginTop: "1em",
  },
}));

const Footer = (props) => {
  const { setTabValue } = props;

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Hidden smDown>
        <Grid container justify="center" className={classes.mainContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                to="aboutus"
                onClick={() => {
                  setTabValue(0);
                }}
                className={classes.link}
              >
                About Us
              </Grid>
              <Grid
                item
                component={Link}
                to="support"
                onClick={() => {
                  setTabValue(0);
                }}
                className={classes.link}
              >
                Support Us
              </Grid>
              <Grid
                item
                component={Link}
                to="contact"
                onClick={() => {
                  setTabValue(0);
                }}
                className={classes.link}
              >
                Contact Us
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                to="privacypolicy"
                className={classes.link}
              >
                Privacy Policy
              </Grid>
              <Grid item component={Link} to="terms" className={classes.link}>
                Terms and Conditions
              </Grid>
              <Grid
                item
                component={Link}
                to="communitystandards"
                className={classes.link}
              >
                Community Standards
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.socialContainer}
      >
        <Grid
          item
          component={"a"}
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon className={classes.social} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon className={classes.social} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.reddit.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RedditIcon className={classes.social} />
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
