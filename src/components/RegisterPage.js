import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Container } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(4),
  },
  form: {
    margin: "2em 0",
  },
  formField: { marginTop: "2em" },
}));

const RegisterPage = () => {
  const classes = useStyle();
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
          <Typography variant="body1" align="center">
            after a long hard day of work you find yourself sat at your
            favourite table in your local tavern. <br />
            looking down you notice a single sheet of paper, looks like someone
            left some kind of registration form to join a local group of
            adventurers
            <br /> you have the strong urge to complete it yourself, after all
            you could use some adventure.
          </Typography>
          <form className={classes.form}>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  label="username"
                  className={classes.formField}
                  fullWidth
                  helperText="legends will speak of your glory for years to come, make them remember your name"
                />
                <TextField
                  label="email"
                  className={classes.formField}
                  fullWidth
                  helperText="the boss says that this is like sending a messenger boy, we aren't entirely sure but he says it ain't optional so you best figure it out fast"
                />
                <TextField
                  label="password"
                  className={classes.formField}
                  fullWidth
                  helperText="to join our group you'll need a secret word, it should be something memorable to you but something no one can guess"
                />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    label="date of birth"
                    className={classes.formField}
                    placeholder=""
                    fullWidth
                    value={new Date("1989-07-10")}
                    format="yyyy-MM-DD"
                    helperText="no under 18s allowed, boss doesn't like em, sorry! "
                  />
                </MuiPickersUtilsProvider>{" "}
                <TextField
                  label="country"
                  className={classes.formField}
                  fullWidth
                  helperText="from where do you hail?"
                />
                <TextField
                  label="town/city"
                  className={classes.formField}
                  fullWidth
                  helperText="this is probably where your sat right now"
                />
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="i agree to the community standards, privacy policy and terms and conditions of joining the group"
                    className={classes.formField}
                  />
                </FormGroup>
                <Button variant="contained" color="primary">
                  submit my application
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
