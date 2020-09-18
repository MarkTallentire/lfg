import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";

import logo from "../../assets/cute.svg";
import RegistrationForm from "../Features/RegistrationForm";
import { Redirect } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  title: {
    marginBottom: "1em",
  },
  container: {
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(4),
  },
  logo: {
    height: "2.75rem",
    marginRight: ".5rem",
    [theme.breakpoints.down("md")]: {
      height: "1.75rem",
    },
  },
  header: {
    color: "white",
  },
  link: {
    textDecoration: "none",
  },
  formContainer: {
    margin: theme.spacing(4),
  },
}));

const RegisterPage = ({ setCurrentUser, currentUser }) => {
  const classes = useStyle();

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const innerContent = (
    <>
      <Grid item>
        <Link to="/" className={classes.link}>
          <img src={logo} alt="company logo" className={classes.logo} />
          <Typography variant="h6" component="h1" className={classes.header}>
            <Typography variant="h6" component="span" color="primary">
              lfg.
            </Typography>
            games
          </Typography>
        </Link>
        <Typography variant="body1">Sign Up</Typography>
      </Grid>
      <Grid item>
        <RegistrationForm setCurrentUser={setCurrentUser} />
      </Grid>
    </>
  );

  return (
    <Container fixed maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        className={classes.container}
      >
        {innerContent}
      </Grid>
    </Container>
  );
};

export default RegisterPage;
