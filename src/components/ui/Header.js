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
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import StorefrontIcon from "@material-ui/icons/Storefront";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import HelpIcon from "@material-ui/icons/Help";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import UpdateIcon from "@material-ui/icons/Update";

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
    width: "100%",
    maxWidth: "360",
  },
  burgerButton: {
    marginLeft: "auto",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    switch (window.location.pathname) {
      case "/aboutus":
        if (tabValue !== 0) {
          setTabValue(0);
          setMenuSelectedIndex(0);
        }
        break;
      case "/faqs":
        if (tabValue !== 0) {
          setTabValue(0);
          setMenuSelectedIndex(1);
        }
        break;
      case "/comingsoon":
        if (tabValue !== 0) {
          setTabValue(0);
          setMenuSelectedIndex(2);
        }
        break;
      case "/merch":
        if (tabValue !== 1) {
          setTabValue(1);
        }
        break;
      case "/partners":
        if (tabValue !== 2) {
          setTabValue(2);
        }
        break;
      case "/support":
        if (tabValue !== 3) {
          setTabValue(3);
        }
        break;
      case "/contact":
        if (tabValue !== 4) {
          setTabValue(4);
        }
        break;
      default:
        break;
    }
  }, [tabValue]);

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

  const menuOptions = [
    { name: "about us", href: "/aboutus" },
    { name: "faqs", href: "/faqs" },
    { name: "coming soon", href: "/comingsoon" },
  ];

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
        <Tab
          className={classes.tab}
          label="merch"
          component={Link}
          to="/merch"
        ></Tab>
        <Tab
          className={classes.tab}
          label="partners"
          component={Link}
          to="/partners"
        ></Tab>
        <Tab
          className={classes.tab}
          label="support us"
          component={Link}
          to="/support"
        ></Tab>
        <Tab
          className={classes.tab}
          label="contact us"
          component={Link}
          to="/contact"
        ></Tab>
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
            key={option}
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
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={drawerOpen}
      onOpen={() => {
        setDrawerOpen(true);
      }}
      onClose={() => setDrawerOpen(false)}
    >
      <List component="nav" className={classes.drawer}>
        <ListItem
          divider
          button
          component={Link}
          to="/login"
          onClick={() => setDrawerOpen(false)}
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
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="sign up" />
        </ListItem>
        <ListItem
          divider
          button
          component={Link}
          to="/about"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="about" />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem divider button className={classes.nestedDrawer}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary="about us" />
            </ListItem>
            <ListItem divider button className={classes.nestedDrawer}>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary="faqs" />
            </ListItem>
            <ListItem divider button className={classes.nestedDrawer}>
              <ListItemIcon>
                <UpdateIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary="coming soon" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          divider
          button
          component={Link}
          to="/merch"
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="merch" />
        </ListItem>
        <ListItem
          divider
          button
          component={Link}
          to="/partners"
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemIcon>
            <GroupWorkIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="partners" />
        </ListItem>
        <ListItem
          divider
          button
          component={Link}
          to="/support"
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="support us" />
        </ListItem>
        <ListItem
          divider
          button
          component={Link}
          to="/contact"
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="contact us" />
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
              onClick={() => setTabValue(-1)}
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
