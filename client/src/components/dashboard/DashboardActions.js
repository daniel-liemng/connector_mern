import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "space-between",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  btn: {
    marginRight: "0.5rem",
  },
  deleteBtn: {
    marginRight: "0.5rem",
    backgroundColor: "red",
    color: "white",
  },
}));

const DashboardActions = ({
  deleteAccount,
  errors,
  setSnackbarOpen,
  history,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonGroup}>
      <Button
        component={Link}
        to='/edit-profile'
        color='primary'
        variant='contained'
        className={classes.btn}
      >
        Edit Profile
      </Button>
      <Button
        component={Link}
        to='/add-experience'
        variant='contained'
        color='primary'
        className={classes.btn}
      >
        Add Experience
      </Button>
      <Button
        component={Link}
        to='/add-education'
        variant='contained'
        color='primary'
        className={classes.btn}
      >
        Add Education
      </Button>

      <Button
        variant='contained'
        className={classes.deleteBtn}
        onClick={() => {
          deleteAccount(history);
          if (errors) {
            setSnackbarOpen(true);
          }
        }}
      >
        Delete Profile
      </Button>

      {/* Just remove token in localStorage - userData, isAuth, token still in state */}
      <Button
        variant='contained'
        className={classes.deleteBtn}
        onClick={() => {
          deleteAccount(history);
          if (errors) {
            setSnackbarOpen(true);
          }
        }}
      >
        Delete Account
      </Button>
    </div>
  );
};

export default DashboardActions;
