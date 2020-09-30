import {
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import GamesIcon from "@material-ui/icons/Games";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import UserGames from "./UserGames";
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
  const [tabIndex, setTabIndex] = useState(2);

  const renderTab = () => {
    if (tabIndex === 3) return <AccountSettings />;
    else if (tabIndex === 1) return <UserGroups />;
    else if (tabIndex === 2) return <UserGames />;
  };

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Grid container justify="center">
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            value={tabIndex}
            className={classes.tabs}
          >
            <Tab
              label="Profile"
              icon={<PersonIcon />}
              onClick={() => setTabIndex(0)}
            ></Tab>
            <Tab
              label="Groups"
              icon={<GroupIcon />}
              onClick={() => setTabIndex(1)}
            ></Tab>
            <Tab
              label="Games"
              icon={<GamesIcon />}
              onClick={() => setTabIndex(2)}
            ></Tab>
            <Tab
              label="Settings"
              icon={<SettingsIcon />}
              onClick={() => setTabIndex(3)}
            ></Tab>
          </Tabs>
        </Grid>
        {renderTab()}
      </Container>
    </>
  );
};

export default Profile;
