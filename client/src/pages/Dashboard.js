import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Snackbar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import Loading from "../components/Loading";
import Message from "../components/Message";
import { useProfileContext } from "../context/profileContext";
import { useUserContext } from "../context/userContext";
import DashboardActions from "../components/dashboard/DashboardActions";
import Experience from "../components/dashboard/Experience";
import Education from "../components/dashboard/Education";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "2rem auto",
    textAlign: "center",
  },
  userIcon: {
    marginBottom: 0,
    paddingBottom: 0,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const history = useHistory();

  const {
    getCurrentProfile,
    loading,
    profile,
    deleteAccount,
    errors,
    removeAlert,
  } = useProfileContext();
  const { user } = useUserContext();

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  return loading && profile === null ? (
    <Loading />
  ) : (
    <>
      <Container>
        <Typography variant='h4' color='primary' className={classes.title}>
          Dashboard
        </Typography>

        {errors && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleSnackbarClose}
          >
            <Message
              handleClose={handleSnackbarClose}
              type={errors.length > 0 ? errors[0].type : "error"}
              message={errors.length > 0 ? errors[0].msg : null}
            />
          </Snackbar>
        )}

        <Typography variant='h5'>
          <PersonIcon fontSize='large' className={classes.userIcon} />
          {"  "}
          Welcome {user && user.name}
        </Typography>
        {profile !== null ? (
          <>
            <DashboardActions
              deleteAccount={deleteAccount}
              errors={errors}
              history={history}
              setSnackbarOpen={setSnackbarOpen}
            />
            <Experience experience={profile.experience} />
            <br />
            <Education education={profile.education} />
          </>
        ) : (
          <>
            <Typography variant='body1'>
              You have not yet set up a profile, please add some info.
            </Typography>
            <Button
              component={Link}
              to='/create-profile'
              variant='contained'
              color='primary'
            >
              Create profile
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
