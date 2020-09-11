import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  makeStyles,
  OutlinedInput,
  InputLabel,
  FormControl,
  Container,
  Tooltip,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import CasinoOutlinedIcon from "@material-ui/icons/CasinoOutlined";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import apiClient from "../../ApiClient";

const useStyle = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  container: {
    minHeight: "100vh",
    width: "100%",
  },

  form: {
    width: "100%",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  subtitle: {
    marginLeft: ".5em",
  },
}));

const validationSchema = yup.object().shape({
  groupname: yup
    .string()
    .required(
      "group name is required, can't think of one? hit the random button"
    )
    .min(
      5,
      "group names must be a minimum of 5 characters, can't think of one? hit the random button"
    ),

  description: yup
    .string()
    .required("description is required")
    .min(
      10,
      "descriptions should be a minimum of 10 characters, describe what your group is"
    ),
});

const CreateGroup = () => {
  const classes = useStyle();
  const [loadingRandom, setLoadingRandom] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    criteriaMode: "all",
    defaultValues: { privacyLevel: "private" },
  });

  const onSubmit = (data) => {
    apiClient
      .post("/groups", data)
      .then((response) => console.log(response.data));
  };

  const getRandomName = () => {
    setLoadingRandom(true);
    apiClient.get("/groups/randomname").then((response) => {
      setValue("groupname", response.data, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setLoadingRandom(false);
    });
  };

  return (
    <Container maxWidth={"md"}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid container item>
          <Grid item>
            <Typography variant="h2">create a private group</Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              public games can be accessed via the{" "}
              <Link to="/matchmaker" className={classes.link}>
                matchmaker
              </Link>
            </Typography>
          </Grid>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid item>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                className={classes.margin}
              >
                <InputLabel
                  shrink={Boolean(getValues("groupname"))}
                  error={Boolean(errors.groupname)}
                >
                  group name
                </InputLabel>
                <OutlinedInput
                  notched={Boolean(getValues("groupname"))}
                  label="group name"
                  name="groupname"
                  inputRef={register}
                  error={Boolean(errors.groupname)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <Tooltip title="random">
                          {loadingRandom ? (
                            <CircularProgress primary size={20} />
                          ) : (
                            <CasinoOutlinedIcon onClick={getRandomName} />
                          )}
                        </Tooltip>
                      </IconButton>
                    </InputAdornment>
                  }
                ></OutlinedInput>
                <FormHelperText error={Boolean(errors.groupname)}>
                  {errors.groupname && errors.groupname.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                name="description"
                size="small"
                label="description"
                inputRef={register}
                multiline={true}
                rows="10"
                fullWidth
                variant="outlined"
                className={classes.margin}
                error={Boolean(errors.description)}
                helperText={errors.description && errors.description.message}
              />
            </Grid>
            <Grid item>
              <FormControl component="fieldset" className={classes.margin}>
                <FormLabel>privacy level</FormLabel>
                <Controller
                  as={
                    <RadioGroup>
                      <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="private - no one can join unless explicitly invited by the groups leader"
                      />
                      <FormControlLabel
                        value="friends"
                        control={<Radio />}
                        label="friends only - friends of the group creator can join, anyone else will need an invite"
                      />
                      <FormControlLabel
                        value="groupfriends"
                        control={<Radio />}
                        label="group friends - friends of any existing group member can join, anyone else will need an invite"
                      />
                    </RadioGroup>
                  }
                  control={control}
                  name="privacyLevel"
                />
              </FormControl>
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              create group
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateGroup;
