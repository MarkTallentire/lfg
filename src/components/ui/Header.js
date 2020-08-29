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
        <ListItem
          divider
          button
          component={Link}
          to="/about"
          onClick={() => setOpenMenu(!openMenu)}
          className={
            tabValue === 0 ? classes.activeDrawerItem : classes.drawerItem
          }
          selected={tabValue === 0}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="about" />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              divider
              button
              component={Link}
              to="/aboutus"
              className={`${classes.nestedDrawer} ${
                menuSelectedIndex === 0
                  ? classes.activeDrawerItem
                  : classes.drawerItem
              }`}
              selected={menuSelectedIndex === 0 && tabValue === 0}
              onClick={() => {
                setOpenMenu(false);
                setMenuSelectedIndex(0);
                setDrawerOpen(false);
                setTabValue(0);
              }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary="about us" />
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/faqs"
              className={`${classes.nestedDrawer} ${
                menuSelectedIndex === 1
                  ? classes.activeDrawerItem
                  : classes.drawerItem
              }`}
              selected={menuSelectedIndex === 1 && tabValue === 0}
              onClick={() => {
                setOpenMenu(false);
                setMenuSelectedIndex(1);
                setDrawerOpen(false);
                setTabValue(0);
              }}
            >
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary="faqs" />
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/comingsoon"
              className={`${classes.nestedDrawer} ${
                menuSelectedIndex === 2
                  ? classes.activeDrawerItem
                  : classes.drawerItem
              }`}
              selected={menuSelectedIndex === 2 && tabValue === 0}
              onClick={() => {
                setOpenMenu(false);
                setMenuSelectedIndex(2);
                setDrawerOpen(false);
                setTabValue(0);
              }}
            >
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
          selected={tabValue === 1}
          onClick={() => {
            setOpenMenu(false);
            setDrawerOpen(false);
            setTabValue(1);
            setMenuSelectedIndex(false);
          }}
          className={
            tabValue === 1 ? classes.activeDrawerItem : classes.drawerItem
          }
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
          selected={tabValue === 2}
          onClick={() => {
            setOpenMenu(false);
            setDrawerOpen(false);
            setTabValue(2);
            setMenuSelectedIndex(false);
          }}
          className={
            tabValue === 2 ? classes.activeDrawerItem : classes.drawerItem
          }
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
          selected={tabValue === 3}
          onClick={() => {
            setOpenMenu(false);
            setDrawerOpen(false);
            setTabValue(3);
            setMenuSelectedIndex(false);
          }}
          className={
            tabValue === 3 ? classes.activeDrawerItem : classes.drawerItem
          }
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
          selected={tabValue === 4}
          onClick={() => {
            setOpenMenu(false);
            setDrawerOpen(false);
            setTabValue(4);
            setMenuSelectedIndex(false);
          }}
          className={
            tabValue === 4 ? classes.activeDrawerItem : classes.drawerItem
          }
        >
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="contact us" />
        </ListItem>
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
