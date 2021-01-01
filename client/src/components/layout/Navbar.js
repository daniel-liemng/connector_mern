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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebar = () => {
    return (
      <div
        className={classes.list}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem button component={Link} to='/events'>
            <ListItemText>All Events</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/login'>
            <ListItemText>Login</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/register'>
            <ListItemText>Register</ListItemText>
          </ListItem>
        </List>
      </div>
    );
  };

  const toggleDrawer = (value) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setSidebarOpen(value);
  };

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
              EventBooking
            </Link>
          </Typography>
          <Hidden smDown>
            <Button component={Link} to='/developers' color='inherit'>
              Developers
            </Button>
            <Button component={Link} to='/login' color='inherit'>
              Login
            </Button>
            <Button component={Link} to='/register' color='inherit'>
              Regsiter
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
