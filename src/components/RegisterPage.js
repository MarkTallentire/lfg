import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

import { Container, MenuItem } from "@material-ui/core";
import { CheckboxWithLabel } from "formik-material-ui";

import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import DatePickerField from "./Global/DatePickerField";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  mainContainer: { marginTop: theme.spacing(4) },
  form: {
    margin: "2em 0",
  },
  formField: { marginBottom: "2em" },
  formText: { marginTop: "4em" },
  label: {
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: "1em",
  },
}));

const RegisterPage = () => {
  const classes = useStyle();

  const testCountries = ["England", "Wales", "Scotland"];
  return (
    <Container fixed>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className={classes.mainContainer}
      >
        <Grid item>
          <Typography variant="h2" align="center" className={classes.title}>
            begin your tale
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            after a long hard day of work you find yourself sat at your
            favourite table in the local tavern. its busier than normal and all
            around you people are playing games of all different shapes and
            sizes, there's board games, card games, tabletop rpg games,
            miniatures and even dice games. <br />
            looking down you notice a single sheet of paper, it looks like
            someone left some kind of registration papers to join something
            called lfg.games. you aren't 100% sure why yet but you have an
            overwhelming desire to be a part of it and begin reaching for your
            pen
          </Typography>

          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              dateofbirth: new Date("1989-07-10"),
              city: "",
              country: "",
              termsandconditions: false,
              online: true,
              inperson: true,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email)
                errors.email =
                  "applications with no email address are inadmissable";
              if (!values.username)
                errors.username =
                  "you think for a minute before realising that having no name is a pretty silly idea";
              if (!values.password)
                errors.password =
                  "it's pretty easy to guess a blank password, so much so that your application will be denied immediately";
              if (!values.dateofbirth)
                errors.dateofbirth = "so you're not alive then?";
              if (!values.city) errors.city = "theres no such place as nowhere";
              if (!values.country)
                errors.country = "everyone comes from somewhere";
              if (!values.termsandconditions)
                errors.termsandconditions =
                  "Must agree to the terms and conditions";
              if (!values.online && !values.inperson) {
                errors.inperson = "you must choose one";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({
              submitForm,
              isSubmitting,
              errors,
              isValid,
              touched,
              dirty,
              isValidating,
            }) => (
              <Form className={classes.form}>
                <Grid container direction="column">
                  <Grid item>
                    <Field
                      component={TextField}
                      label="username"
                      name="username"
                      type="username"
                      className={classes.formField}
                      fullWidth
                      helperText={
                        errors.username && touched.username
                          ? errors.username
                          : "legends will speak of your glory for years to come, make them remember your name"
                      }
                    />
                    <Field
                      component={TextField}
                      label="email"
                      type="email"
                      name="email"
                      className={classes.formField}
                      fullWidth
                      helperText={
                        errors.email && touched.email
                          ? errors.email
                          : "we promise to never give this email address away to anyone else but we do need it to keep you up to date"
                      }
                    />
                    <Field
                      component={TextField}
                      label="password"
                      name="password"
                      type="password"
                      className={classes.formField}
                      fullWidth
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : "to join you'll need a secret word, you'll be asked for it whenever you return. it should be something memorable to you but something no one else can guess"
                      }
                    />
                    <Field
                      component={DatePickerField}
                      label="date of birth"
                      name="dateofbirth"
                      className={classes.formField}
                      fullWidth
                      format="yyyy-MM-DD"
                      maxDate={moment().add(-18, "year")}
                      helperText={
                        errors.dateofbirth && touched.dateofbirth
                          ? errors.dateofbirth
                          : "currently we are only accepting applications from those aged 18 years or over."
                      }
                    />
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      className={classes.formField}
                    >
                      <Typography variant="caption" className={classes.label}>
                        how do you want to play?
                      </Typography>
                      <Grid item>
                        <Field
                          type="checkbox"
                          component={CheckboxWithLabel}
                          name="online"
                          Label={{
                            label: "online",
                          }}
                        />
                        <Field
                          type="checkbox"
                          component={CheckboxWithLabel}
                          name="inperson"
                          Label={{
                            label: "in person",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        {errors.inperson && (
                          <Typography variant="caption" color="error">
                            {errors.inperson}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Field
                      component={TextField}
                      label="country"
                      name="country"
                      select={true}
                      className={classes.formField}
                      fullWidth
                      helperText={
                        errors.country && touched.country
                          ? errors.country
                          : "from where do you hail?"
                      }
                    >
                      {testCountries.map((country) => (
                        <MenuItem value={country} key={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Field>
                    <Field
                      component={TextField}
                      select={true}
                      label="town/city"
                      name="city"
                      className={classes.formField}
                      fullWidth
                      helperText={
                        errors.city && touched.city
                          ? errors.city
                          : "this is probably where you're sat right now, you know, in your local tavern?"
                      }
                    >
                      <MenuItem value="Peterlee">Peterlee</MenuItem>
                      <MenuItem value="Newcastle Upon Tyne">
                        Newcastle Upon Tyne
                      </MenuItem>
                    </Field>

                    <Grid container direction="column" justify="flex-start">
                      <Grid item>
                        <Field
                          type="checkbox"
                          component={CheckboxWithLabel}
                          name="termsandconditions"
                          Label={{
                            label:
                              "upon joining i agree to the privacy policy, community standards and terms and conditions",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={
                            isValidating || isSubmitting || !isValid || !dirty
                          }
                          onClick={submitForm}
                        >
                          submit your application
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
