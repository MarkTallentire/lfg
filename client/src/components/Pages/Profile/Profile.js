import {
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import UserGroups from "./UserGroups";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tabs: {
    marginBottom: "1em",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(1);

  const renderTab = () => {
    if (tabIndex === 5) return <AccountSettings />;
    else if (tabIndex === 1) return <UserGroups />;
  };

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
            value={tabIndex}
            className={classes.tabs}
          >
            <Tab label="Profile" onClick={() => setTabIndex(0)}></Tab>
            <Tab label="Groups" onClick={() => setTabIndex(1)}></Tab>
            <Tab label="Games" onClick={() => setTabIndex(2)}></Tab>
            <Tab label="Ratings" onClick={() => setTabIndex(3)}></Tab>
            <Tab label="Friends" onClick={() => setTabIndex(4)}></Tab>
            <Tab label="Settings" onClick={() => setTabIndex(5)}></Tab>
          </Tabs>
        </Grid>
        {renderTab()}
      </Container>
    </>
  );
};

export default Profile;
