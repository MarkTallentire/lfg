import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Paper } from "@material-ui/core";

import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";

import { Link, Redirect } from "react-router-dom";
import * as yup from "yup";

import logo from "../../assets/cute.svg";
import ApiClient from "../../ApiClient";

const useStyle = makeStyles((theme) => ({
  logo: {
    height: "2.75rem",
    marginRight: ".5rem",
    [theme.breakpoints.down("md")]: {
      height: "1.75rem",
    },
  },
  paper: {
    padding: theme.spacing(4),
  },
  header: {
    color: "white",
  },
  container: {
    height: "100vh",
  },
  formInput: {
    margin: "1em 0",
  },
  link: {
    textDecoration: "none",
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const validationSchema = yup.object().shape({
  username: yup.string().required("username required"),
  password: yup.string().required("password required"),
});

const LoginPage = ({ setCurrentUser, currentUser }) => {
  const classes = useStyle();

  const { register, handleSubmit, errors, formState, setError } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    ApiClient.post("/auth/login", data)
      .then((response) => {
        localStorage.setItem("jwt", response.data);
        setCurrentUser(true);
      })
      .catch((error) => {
        console.log(error);
        setError("form", {
          type: "manual",
          message: error.response.data.serverError,
        });
      });
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container fixed maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        className={classes.container}
      >
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
          <Typography variant="body1">Login</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item>
              <TextField
                label="Username"
                name="username"
                inputRef={register}
                fullWidth
                variant="outlined"
                className={classes.formInput}
                size="small"
                helperText={errors.username && errors.username.message}
                error={Boolean(errors.username)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                name="password"
                inputRef={register}
                fullWidth
                variant="outlined"
                className={classes.formInput}
                size="small"
                type="password"
                helperText={errors.password && errors.password.message}
                error={Boolean(errors.password)}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.error}>
                {errors.form && errors.form.message}
              </Typography>
            </Grid>
            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <Typography
                  variant="body2"
                  to="/register"
                  component={Link}
                  className={classes.link}
                  color="primary"
                >
                  Register Instead
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={formState.isSubmitting || !formState.isDirty}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
