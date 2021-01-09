import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import { Typography, Container, Button, Grid } from "@material-ui/core";

import { useProfileContext } from "../context/profileContext";
import Loading from "../components/Loading";
import ProfileTop from "../components/profile/ProfileTop";
import ProfileAbout from "../components/profile/ProfileAbout";
import ProfileExperience from "../components/profile/ProfileExperience";
import ProfileEducation from "../components/profile/ProfileEducation";
import ProfileGithub from "../components/profile/ProfileGithub";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  paper: {
    marginTop: "2rem",
    padding: "1rem",
  },
}));

const Profile = ({ match }) => {
  const classes = useStyles();

  const { profile, getProfileById, loading } = useProfileContext();

  useEffect(() => {
    getProfileById(match.params.id);
  }, []);

  return (
    <Container className={classes.root}>
      {profile === null || loading ? (
        <Loading />
      ) : (
        <>
          <Button
            component={Link}
            to='/profiles'
            variant='contained'
            color='primary'
          >
            Back To Profiles
          </Button>

          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant='h3' color='primary' align='center'>
                  Experience
                </Typography>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((exp, index) => (
                      <ProfileExperience experience={exp} key={index} />
                    ))}
                  </>
                ) : (
                  <Typography
                    variant='h6'
                    align='center'
                    style={{ marginTop: "1rem" }}
                  >
                    No experience credentials
                  </Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant='h3' color='primary' align='center'>
                  Education
                </Typography>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((edu, index) => (
                      <ProfileEducation education={edu} key={index} />
                    ))}
                  </>
                ) : (
                  <Typography
                    variant='h6'
                    align='center'
                    style={{ marginTop: "1rem" }}
                  >
                    No education credentials
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;
