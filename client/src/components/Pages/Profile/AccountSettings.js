import React from "react";
import { Grid, Typography, Avatar, Paper, makeStyles } from "@material-ui/core";
import RegistrationForm from "../../Features/RegistrationForm";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "6em",
    width: "6em",
    marginBottom: theme.spacing(2),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(2),
  },
}));

const AccountSettings = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid container item md={4} justify="center">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  className={classes.avatar}
                  src="https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/118160258_10158694070254679_96894825072179823_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=bmqohvj6X1oAX85LDr2&_nc_ht=scontent-lhr8-1.xx&oh=18576df2a3a9a7a287fb023fea8175c7&oe=5F896ED1"
                />
              </Grid>
              <Grid item>
                <Typography variant="h5">Olemus</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Can't smile wide enough
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid item md={8}>
        <Paper className={classes.paper}>
          <RegistrationForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AccountSettings;
