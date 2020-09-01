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
          <Typography variant="h2" align="center">
            begin your tale
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            after a long hard day of work you find yourself sat at your
            favourite table in the local tavern. looking down you notice a
            single sheet of paper, it looks like someone left some kind of
            registration form to join the local adventurers guild. suddenly an
            overwhelming desire for adventure washes over you and you scramble
            for the nearest pen
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
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email)
                errors.email =
                  "applications with no email address are inadmissable in the adventurers guild";
              if (!values.username)
                errors.username =
                  "you think for a minute before realising that having no name is a pretty silly idea";
              if (!values.password)
                errors.password =
                  "it's pretty easy to guess a blank password, so much so that your application will be denied immediately";
              if (!values.dateofbirth) errors.dateofbirth = "Required";
              if (!values.city) errors.city = "Required";
              if (!values.country) errors.country = "Required";
              if (!values.termsandconditions)
                errors.termsandconditions =
                  "Must agree to the terms and conditions";
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting, values, errors }) => (
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
                        errors.username
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
                        errors.email
                          ? errors.email
                          : "at the adventurers guild we promise to never give this email address away to anyone else, we'll use it instead of our messenger horses to save their tired legs"
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
                        errors.password
                          ? errors.password
                          : "to join the guild you'll need a secret word, it should be something memorable to you but something no one can guess"
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
                        errors.dateofbirth
                          ? errors.dateofbirth
                          : "currently the adventurers guild is only accepting applications from those aged 18 years or over."
                      }
                    />
                    <Field
                      component={TextField}
                      label="country"
                      name="country"
                      select={true}
                      className={classes.formField}
                      fullWidth
                      helperText={
                        errors.country
                          ? errors.country
                          : "from where do you hail?"
                      }
                    >
                      {testCountries.map((country) => (
                        <MenuItem value="{country}" key={country}>
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
                        errors.city
                          ? errors.city
                          : "this is probably where you're sat right now, you know, in your local tavern"
                      }
                    >
                      <MenuItem value="Peterlee">Peterlee</MenuItem>
                      <MenuItem value="Newcastle Upon Tyne">
                        Newcastle Upon Tyne
                      </MenuItem>
                    </Field>
                    <Field
                      type="checkbox"
                      component={CheckboxWithLabel}
                      name="termsandconditions"
                      Label={{
                        label:
                          "upon joining the adventurers guild i agree to the privacy policy, community standards and terms and conditions",
                      }}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      submit your application
                    </Button>
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
