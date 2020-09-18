import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import RegistrationForm from "../Features/RegistrationForm";

const useStyles = makeStyles((theme) => ({
  titleBar: {
    minHeight: "15vh",
  },
  titleBarInner: {
    height: "100%",
    padding: theme.spacing(2),
  },
  avatar: {
    height: "6em",
    width: "6em",
    marginBottom: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h5">Profile</Typography>
        <Grid container>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            value={0}
          >
            <Tab label="Profile"></Tab>
            <Tab label="Groups"></Tab>
            <Tab label="Games"></Tab>
            <Tab label="Ratings"></Tab>
            <Tab label="Friends"></Tab>
            <Tab label="Settings"></Tab>
          </Tabs>
        </Grid>

        <Grid container spacing={2} className={classes.container}>
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
      </Container>
    </>
  );
};

export default Profile;
