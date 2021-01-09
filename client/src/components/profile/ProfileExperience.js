import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
}));

const ProfileExperience = ({ experience }) => {
  const classes = useStyles();

  const { company, title, current, to, from, description } = experience;

  return (
    <div className={classes.root}>
      <Typography variant='h5' style={{ marginTop: "1rem" }}>
        {company}
      </Typography>
      <Typography variant='body2' style={{ marginBottom: "0.5rem" }}>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{" "}
        {current ? "Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </Typography>
      <Typography variant='body1' style={{ marginBottom: "0.5rem" }}>
        <strong>Position:</strong> {title}
      </Typography>
      <Typography variant='body1' style={{ marginBottom: "0.5rem" }}>
        <strong>Description:</strong> {description}
      </Typography>
      <hr />
    </div>
  );
};

export default ProfileExperience;
