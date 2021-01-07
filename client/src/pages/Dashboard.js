import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import Loading from "../components/Loading";
import { useProfileContext } from "../context/profileContext";
import { useUserContext } from "../context/userContext";
import DashboardActions from "../components/DashboardActions";

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

  const { getCurrentProfile, loading, profile } = useProfileContext();
  const { user } = useUserContext();

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Loading />
  ) : (
    <>
      <Container>
        <Typography variant='h4' color='primary' className={classes.title}>
          Dashboard
        </Typography>

        <Typography variant='h5'>
          <PersonIcon fontSize='large' className={classes.userIcon} />
          {"  "}
          Welcome {user && user.name}
        </Typography>
        {profile !== null ? (
          <DashboardActions />
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
