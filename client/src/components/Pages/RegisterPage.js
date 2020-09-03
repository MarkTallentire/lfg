import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import { Container, Box } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";

import logo from "../../assets/cute.svg";

import RegistrationForm from "../Features/RegistrationForm";
import { useTheme } from "@material-ui/core/styles";

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
    [theme.breakpoints.down("xs")]: {
      height: "1.75rem",
    },
  },
}));

const RegisterPage = () => {
  const classes = useStyle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const onSubmit = (values, { setStatus, setSubmitting }) => {
    Axios.post("https://localhost:44326/api/auth", values)
      .then(console.log("done"))
      .catch((error) => {
        const errors = {};
        console.log(error.response.data.errors);
        for (const key in error.response.data.errors) {
          console.log(key);
          errors[key.toLowerCase()] = error.response.data.errors[key];

          console.log(errors);
        }
      });
    setSubmitting(false);
  };

  const innerContent = (
    <>
      <Grid item>
        <img src={logo} alt="company logo" className={classes.logo} />
        <Typography variant="h6" component="h1">
          <Typography variant="h6" component="span" color="primary">
            lfg.
          </Typography>
          games
        </Typography>
        <Typography variant="body1">create your account</Typography>
      </Grid>
      <Grid item>
        <RegistrationForm onSubmit={onSubmit} />
      </Grid>
    </>
  );

  return (
    <Box justifyContent="center" alignItems="center">
      <Container fixed maxWidth="md">
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          className={classes.container}
        >
          {matches ? (
            <Paper variant="outlined" className={classes.paper}>
              {innerContent}
            </Paper>
          ) : (
            innerContent
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage;
