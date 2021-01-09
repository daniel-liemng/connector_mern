import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Container } from "@material-ui/core";

import { useProfileContext } from "../context/profileContext";
import Loading from "../components/Loading";
import ProfileItem from "../components/profiles/ProfileItem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
}));

const Profiles = () => {
  const classes = useStyles();

  const { profiles, getProfiles, loading } = useProfileContext();

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <Container className={classes.root}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography variant='h3' color='secondary' align='center'>
            Developers
          </Typography>
          <Typography variant='h5'>
            Browse and connect with developers
          </Typography>
          <div>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <Typography variant='h5'>No Profile Found</Typography>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default Profiles;
