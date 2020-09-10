import React, { useEffect, useState, useMemo } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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

const GooglePlacesLocationSearch = ({
  register,
  setValue,
  classes,
  errors,
}) => {
  const loaded = React.useRef(false);
  const [options, setOptions] = useState([]);
  const [locationValue, setLocationValue] = React.useState(null);
  const [locationInputValue, setLocationInputValue] = React.useState("");

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

  useEffect(() => {
    register("googleplaceid");
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

  return (
    <Autocomplete
      filterOptions={(x) => x}
      options={options}
      noOptionsText="start typing a location to see your options"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      size="small"
      autoComplete
      includeInputInList
      filterSelectedOptions
      name="googleplaceid"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setLocationValue(newValue);
        setValue("googleplaceid", newValue ? newValue.place_id : null);
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
          error={Boolean(errors.googleplaceid)}
          helperText={
            errors.googleplaceid
              ? errors.googleplaceid.message
              : "we use your location to group you with nearby players, be as specific as you like but we recommend city/town level as a minimum"
          }
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
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
  );
};

export default GooglePlacesLocationSearch;
