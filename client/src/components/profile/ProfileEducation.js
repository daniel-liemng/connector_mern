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

const ProfileEducation = ({ education }) => {
  const classes = useStyles();

  const {
    school,
    degree,
    fieldofstudy,
    description,
    current,
    to,
    from,
  } = education;

  return (
    <div className={classes.root}>
      <Typography variant='h5' style={{ marginTop: "1rem" }}>
        {school}
      </Typography>
      <Typography variant='body2' style={{ marginBottom: "0.5rem" }}>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{" "}
        {current ? "Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </Typography>
      <Typography variant='body1' style={{ marginBottom: "0.5rem" }}>
        <strong>Degree:</strong> {degree}
      </Typography>
      <Typography variant='body1' style={{ marginBottom: "0.5rem" }}>
        <strong>Field of Study:</strong> {fieldofstudy}
      </Typography>
      <Typography variant='body1' style={{ marginBottom: "0.5rem" }}>
        <strong>Description:</strong> {description}
      </Typography>
      <hr />
    </div>
  );
};

export default ProfileEducation;
