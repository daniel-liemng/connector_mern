import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Paper } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    padding: "1rem",
  },
  skills: {
    marginTop: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    color: theme.palette.secondary.main,
  },
  // Align Icon and Text the same level
  skill: {
    marginRight: "1rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

const ProfileAbout = ({ profile }) => {
  const classes = useStyles();

  const {
    user: { name },
    bio,
    skills,
  } = profile;

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant='h3' align='center' color='primary'>
          {name.trim().split(" ")[0]}'s Bio
        </Typography>
        <Typography variant='h6' align='center' style={{ marginTop: "1.5rem" }}>
          {bio ? bio : "No bio to display"}
        </Typography>
      </Paper>
      <Paper className={classes.root}>
        <Typography variant='h3' align='center' color='primary'>
          Skills Set
        </Typography>
        <div className={classes.skills}>
          {skills.map((skill, index) => (
            <div key={index} className={classes.skill}>
              <CheckIcon /> {skill}
            </div>
          ))}
        </div>
      </Paper>
    </>
  );
};

export default ProfileAbout;
