import React from "react";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";

import { useUserContext } from "../context/userContext";
import HomeImg from "../assets/home.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    background: `url(${HomeImg}) no-repeat center center/cover`,
    height: "93vh",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  inner: {
    height: "100%",
    width: "80%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#ffffff",
  },
  btnGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Home = () => {
  const classes = useStyles();

  const { isAuthenticated } = useUserContext();

  // Redirect to Dashboard if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.overlay}>
        <div className={classes.inner}>
          <Typography
            variant='h2'
            color='secondary'
            style={{ marginBottom: "1rem" }}
          >
            Wide Networking
          </Typography>
          <Typography variant='h4' style={{ marginBottom: "1.5rem" }}>
            Open your networking widely and connect people
          </Typography>
          <div className={classes.btnGroup}>
            <Button
              component={Link}
              to='/login'
              variant='contained'
              color='secondary'
              style={{ marginRight: "0.5rem" }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to='/register'
              variant='contained'
              color='secondary'
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
