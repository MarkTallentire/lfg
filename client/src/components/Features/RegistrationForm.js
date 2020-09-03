import React, { useEffect, useState, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import parse from "autosuggest-highlight/parse";
import { makeStyles } from "@material-ui/styles";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { FormControlLabel, Checkbox, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import throttle from "lodash/throttle";

/*Todo:: All google autocomplete code is taken from Material Labs documentation and could use a tidy up */

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const googleAutoCompleteService = { current: null };

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
}));

const validationSchema = yup.object().shape({
  location: yup.string().required("location is required"),
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
});

const RegistrationForm = () => {
  const loaded = React.useRef(false);
  const [options, setOptions] = useState([]);
  const [locationValue, setLocationValue] = React.useState(null);
  const [locationInputValue, setLocationInputValue] = React.useState("");

  console.log(process.env.REACT_APP_GOOGLE_PLACES_API_KEY);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        googleAutoCompleteService.current.getPlacePredictions(
          request,
          callback
        );
      }, 200),
    []
  );

  const { control, register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(validationSchema, { abortEarly: false }),
    mode: "onTouched",
  });

  useEffect(() => {
    register("location");
    let active = true;

    if (!googleAutoCompleteService.current && window.google) {
      googleAutoCompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!googleAutoCompleteService.current) {
      return undefined;
    }

    if (locationInputValue === "") {
      setOptions(locationValue ? [locationValue] : []);
      return undefined;
    }

    fetch({ input: locationInputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (locationValue) {
          newOptions = [locationValue];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [locationValue, locationInputValue, fetch, register]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const classes = useStyle();
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
            control={
              <Checkbox name="online" inputRef={register} color="primary" />
            }
            label="in person"
          />
        </Grid>
        <Grid item>
          <Autocomplete
            filterOptions={(x) => x}
            options={options}
            noOptionsText="start typing to find a location"
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.description
            }
            size="small"
            autoComplete
            includeInputInList
            filterSelectedOptions
            name="location"
            onChange={(event, newValue) => {
              setOptions(newValue ? [newValue, ...options] : options);
              setLocationValue(newValue);
              setValue("location", newValue ? newValue.place_id : null);
            }}
            onInputChange={(event, newInputValue) => {
              setLocationInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.formInput}
                fullWidth
                variant="outlined"
                label="location"
                error={Boolean(errors.location)}
                helperText={
                  errors.location
                    ? errors.location.message
                    : "we use your location to group you with nearby players, be as specific as you like but we recommend city/town level as a minimum"
                }
              />
            )}
            renderOption={(option) => {
              const matches =
                option.structured_formatting.main_text_matched_substrings;
              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match) => [
                  match.offset,
                  match.offset + match.length,
                ])
              );

              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <LocationOnIcon className={classes.icon} />
                  </Grid>
                  <Grid item xs>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{ fontWeight: part.highlight ? 700 : 400 }}
                      >
                        {part.text}
                      </span>
                    ))}

                    <Typography variant="body2" color="textSecondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }}
          />
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
              sign in instead
            </Typography>
          </Grid>
          <Grid item>
            <Button
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
