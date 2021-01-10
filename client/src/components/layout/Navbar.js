import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";

import { useUserContext } from "../../context/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: "none",
    color: "inherit",
  },
  list: {
    width: 250,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const { user_loading, isAuthenticated, logout } = useUserContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebar = () => {
    return (
      <div
        className={classes.list}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {!user_loading && (
          <>{isAuthenticated ? authLinksSide() : guestLinksSide()}</>
        )}
      </div>
    );
  };

  const toggleDrawer = (value) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setSidebarOpen(value);
  };

  // Navbar
  const authLinksNav = () => (
    <>
      <Button component={Link} to='/profiles' color='inherit'>
        Developers
      </Button>
      <Button component={Link} to='/posts' color='inherit'>
        Posts
      </Button>
      <Button component={Link} to='/dashboard' color='inherit'>
        Dashboard
      </Button>
      <Button onClick={logout} color='inherit'>
        Logout
      </Button>
    </>
  );
  const guestLinksNav = () => (
    <>
      <Button component={Link} to='/profiles' color='inherit'>
        Developers
      </Button>
      <Button component={Link} to='/login' color='inherit'>
        Login
      </Button>
      <Button component={Link} to='/register' color='inherit'>
        Regsiter
      </Button>
    </>
  );

  // Sidebar
  const authLinksSide = () => (
    <List>
      <ListItem button component={Link} to='/profiles'>
        <ListItemText>Developers</ListItemText>
      </ListItem>
      <ListItem button component={Link} to='/posts'>
        <ListItemText>Posts</ListItemText>
      </ListItem>
      <ListItem button component={Link} to='/dashboard'>
        <ListItemText>Dashboard</ListItemText>
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemText>Logout</ListItemText>
      </ListItem>
    </List>
  );
  const guestLinksSide = () => (
    <List>
      <ListItem button component={Link} to='/profiles'>
        <ListItemText>Developers</ListItemText>
      </ListItem>
      <ListItem button component={Link} to='/login'>
        <ListItemText>Login</ListItemText>
      </ListItem>
      <ListItem button component={Link} to='/register'>
        <ListItemText>Register</ListItemText>
      </ListItem>
    </List>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <SwipeableDrawer
            anchor='left'
            open={sidebarOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {sidebar()}
          </SwipeableDrawer>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.titleLink}>
              WideNetwork
            </Link>
          </Typography>
          <Hidden smDown>
            {!user_loading && (
              <>{isAuthenticated ? authLinksNav() : guestLinksNav()}</>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
