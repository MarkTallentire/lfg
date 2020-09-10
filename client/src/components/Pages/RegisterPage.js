import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";

import logo from "../../assets/cute.svg";
import RegistrationForm from "../Features/RegistrationForm";
import { Redirect } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  title: {
    marginBottom: "1em",
  },
  container: {
    minHeight: "90vh",
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "transparent",
  },
  logo: {
    height: "2.75rem",
    marginRight: ".5rem",
    [theme.breakpoints.down("md")]: {
      height: "1.75rem",
    },
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
        <Hidden mdDown>
          <img src={logo} alt="company logo" className={classes.logo} />
        </Hidden>
        <Typography variant="h6" component="h1">
          <Typography variant="h6" component="span" color="primary">
            lfg.
          </Typography>
          games
        </Typography>
        <Typography variant="body1">create your account</Typography>
      </Grid>
      <Grid item>
        <RegistrationForm setCurrentUser={setCurrentUser} />
      </Grid>
    </>
  );

  return (
    <Container fixed maxWidth="md">
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
