import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/styles";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Link } from "react-router-dom";

import axios from "../../ApiClient";
import GooglePlacesLocationSearch from "../Global/GooglePlacesLocationSearch";

const useStyle = makeStyles((theme) => ({
  logo: {
    maxWidth: "3em",
    margin: "2em 0em",
  },
  formInput: {
    margin: "1em 0",
  },
  button: {
    margin: "2em 0",
  },
  labelColour: {
    color: theme.palette.text.secondary,
  },
  checkboxLabel: {
    marginTop: "1em",
  },
  link: {
    textDecoration: "none",
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const validationSchema = yup.object().shape({
  googleplaceid: yup.string().required("location is required"),
  username: yup.string().required("username required"),
  emailaddress: yup.string().email("invalid email").required("invalid email"),
  password: yup
    .string()
    .required("password required")
    .min(6, "password must be a minimum of 6 characters")
    .matches(
      /* eslint-disable no-useless-escape */
      /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
      "password must contain a special character"
    ),
  dateofbirth: yup
    .string()
    .nullable()
    .required("date of birth is required")
    .test(
      "",
      `we aren't currently accepting registrations from children under 13`,
      function (value) {
        return moment().diff(moment(value), "years") >= 13;
      }
    ),
  inperson: yup.bool(),
  online: yup.bool().when("inperson", {
    is: false,
    then: yup.bool().oneOf([true], "you must play either online or in person"),
  }),
  termsandconditions: yup.bool().oneOf([true], "you must agree to this"),
});

const RegistrationForm = ({ setCurrentUser }) => {
  const classes = useStyle();
  const {
    control,
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    criteriaMode: "all",
  });

  const onSubmit = (data, errors) => {
    data.dateofbirth = moment(data.dateofbirth).format("YYYY-MM-DD");
    axios
      .post("auth", data)
      .then((response) => {
        localStorage.setItem("jwt", response.data);
        setCurrentUser(true);
      })
      .catch((error) => {
        if (error.response.data.serverError) {
          setError("form", {
            type: "manual",
            message: error.response.data.serverError,
          });
        } else if (error.response.data.errors) {
          for (let validationError in error.response.data.errors) {
            //TODO:: I can only work out a way to display one error at a time right now on the client validation so matching this from a server side pespective
            setError(validationError.toLowerCase(), {
              type: "manual",
              message: error.response.data.errors[validationError][0],
            });
          }
        }
      });
  };

  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            className={classes.formInput}
            variant="outlined"
            name="username"
            label="username"
            inputRef={register}
            error={Boolean(errors.username)}
            helperText={errors.username && errors.username.message}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            className={classes.formInput}
            variant="outlined"
            name="emailaddress"
            label="email address"
            inputRef={register}
            error={Boolean(errors.emailaddress)}
            helperText={errors.emailaddress && errors.emailaddress.message}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            className={classes.formInput}
            variant="outlined"
            name="password"
            label="password"
            fullWidth
            inputRef={register}
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password && errors.password.message}
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <Controller
              size="small"
              initialFocusedDate={null}
              defaultValue={null}
              control={control}
              as={KeyboardDatePicker}
              className={classes.formInput}
              variant="inline"
              inputVariant="outlined"
              openTo="year"
              name="dateofbirth"
              label="date of birth"
              fullWidth
              format={"YYYY-MM-DD"}
              maxDate={moment().add(-13, "years")}
              disableFuture
              placeholder={null}
              inputRef={register}
              error={Boolean(errors.dateofbirth)}
              helperText={errors.dateofbirth && errors.dateofbirth.message}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            className={`${classes.labelColour} ${classes.checkboxLabel}`}
          >
            how do you want to play?
          </Typography>
          <FormControlLabel
            className={classes.labelColour}
            control={
              <Checkbox name="online" inputRef={register} color="primary" />
            }
            label="online"
          />
          <FormControlLabel
            className={classes.labelColour}
            control={<Checkbox name="inperson" inputRef={register} />}
            label="in person"
          />
          {errors.online && (
            <Typography variant="body2" className={classes.error}>
              {errors.online.message}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <GooglePlacesLocationSearch
            register={register}
            errors={errors}
            classes={classes}
            setValue={setValue}
          />
        </Grid>

        <Grid item>
          <FormControlLabel
            className={classes.labelColour}
            control={<Checkbox name="termsandconditions" inputRef={register} />}
            label="i agree to the community standards, privacy policy and terms and conditions"
          />
          <Typography variant="body2" className={classes.error}>
            {errors.termsandconditions && errors.termsandconditions.message}
          </Typography>
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
              to="/login"
              component={Link}
              className={classes.link}
              color="primary"
            >
              log in instead
            </Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={formState.isSubmitting || !formState.isDirty}
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default RegistrationForm;
