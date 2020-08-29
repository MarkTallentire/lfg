import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import StorefrontIcon from "@material-ui/icons/Storefront";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import HelpIcon from "@material-ui/icons/Help";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import { Link } from "react-router-dom";
import logo from "../../assets/cute.svg";
import { ListItemIcon, ListItemText } from "@material-ui/core";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: { ...theme.mixins.toolbar },
  logoButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "2.75rem",
    marginRight: ".5rem",
    [theme.breakpoints.down("xs")]: {
      height: "1.75rem",
    },
  },
  tabContainer: { marginLeft: "auto" },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: { marginLeft: "25px", borderRadius: "3px" },
  menu: { borderRadius: "3px" },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  icon: {
    verticalAlign: "middle",
  },
  nestedDrawer: {
    paddingLeft: theme.spacing(4),
  },
  drawer: {
    minWidth: "75%",
    height: "100%",
    justifyContent: "space-between",
  },
  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
  },
  activeDrawerItem: {
    ...theme.typography.tab,
    opacity: 1,
  },
  drawerItemEmphasised: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  drawerItemPushBottom: {
    alignSelf: "flex-end",
  },
  burgerButton: {
    marginLeft: "auto",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const menuOptions = [
    { name: "about us", href: "/aboutus" },
    { name: "faqs", href: "/faqs" },
    { name: "coming soon", href: "/comingsoon" },
  ];

  const routes = [
    { name: "about", href: "/aboutus", icon: <InfoIcon /> },
    { name: "merch", href: "/merch", icon: <StorefrontIcon /> },
    { name: "partners", href: "/partners", icon: <GroupWorkIcon /> },
    { name: "support", href: "/support", icon: <HelpIcon /> },
    { name: "contact", href: "/contact", icon: <ContactMailIcon /> },
  ];

  useEffect(() => {
    for (let i = 0; i < routes.length; i++) {
      if (window.location.pathname === routes[i].href) {
        setTabValue(i);
      }
    }
  }, [tabValue, routes]);

  const handleTabChange = (e, index) => {
    setTabValue(index);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setMenuSelectedIndex(i);
  };

  const tabs = (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className={classes.tabContainer}
      >
        <Tab
          className={classes.tab}
          label={<div>about</div>}
          aria-owns={anchorEl ? "about-menu" : undefined}
          aria-haspopup={anchorEl ? true : undefined}
          onClick={(e) => handleMenuClick(e)}
        ></Tab>
        {routes.map(
          (route) =>
            route.name !== "about" && (
              <Tab
                key={route.name}
                className={classes.tab}
                label={route.name}
                component={Link}
                to={route.href}
              ></Tab>
            )
        )}
      </Tabs>
      <Button
        color="primary"
        className={classes.button}
        variant="outlined"
        component={Link}
        to="/login"
      >
        login
      </Button>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        component={Link}
        to="/register"
      >
        sign up
      </Button>
      <Menu
        id="about-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        classes={{ paper: classes.menu }}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option.name}
            onClick={(e) => {
              handleMenuItemClick(e, i);
              setTabValue(0);
              handleMenuClose();
            }}
            classes={{ root: classes.menuItem }}
            component={Link}
            to={option.href}
            selected={i === menuSelectedIndex && tabValue === 0}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <SwipeableDrawer
      classes={{ root: classes.drawer, paper: classes.drawer }}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={drawerOpen}
      onOpen={() => {
        setDrawerOpen(true);
      }}
      onClose={() => setDrawerOpen(false)}
    >
      <List component="nav" className={classes.nav}>
        {routes.map((route, i) => (
          <ListItem
            key={route.name}
            divider
            button
            component={Link}
            to={route.href}
            selected={tabValue === i}
            onClick={() => {
              setOpenMenu(false);
              setDrawerOpen(false);
              setTabValue(i);
              setMenuSelectedIndex(false);
            }}
            className={
              tabValue === i ? classes.activeDrawerItem : classes.drawerItem
            }
          >
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText disableTypography primary={route.name} />
          </ListItem>
        ))}
      </List>
      <List component="nav" className={classes.nav}>
        <ListItem
          divider
          button
          component={Link}
          to="/login"
          onClick={() => {
            setTabValue(false);
            setDrawerOpen(false);
            setOpenMenu(false);
          }}
          className={`${classes.activeDrawerItem}`}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="login" />
        </ListItem>
        <ListItem
          divider
          button
          component={Link}
          to="/register"
          onClick={() => {
            setTabValue(false);
            setDrawerOpen(false);
            setOpenMenu(false);
          }}
          className={`${classes.activeDrawerItem} ${classes.drawerItemEmphasised}`}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="sign up" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="transparent">
          <Toolbar>
            <Button
              component={Link}
              to="/"
              onClick={() => setTabValue(false)}
              disableRipple
              className={classes.logoButton}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
              <Typography variant="h6" component="h1">
                <Typography variant="h6" component="span" color="primary">
                  lfg.
                </Typography>
                games
              </Typography>
            </Button>
            {matches && (
              <IconButton
                onClick={() => setDrawerOpen(!drawerOpen)}
                disableRipple
                className={classes.burgerButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
