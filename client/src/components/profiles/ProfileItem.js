import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Button,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: "1rem",
    padding: "1rem",
    marginTop: "1.5rem",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "15rem",
  },
  img: {
    width: "10rem",
    height: "10rem",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "30rem",
  },
  btn: {
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  skills: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    color: theme.palette.secondary.main,
  },
}));

const ProfileItem = ({ profile }) => {
  const classes = useStyles();

  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  } = profile;

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.imgContainer}>
        <Avatar src={avatar} alt={name} className={classes.img} />
      </CardMedia>
      <CardContent className={classes.info}>
        <div>
          <Typography variant='h5'>{name}</Typography>
          <Typography variant='body1'>
            {status} {company && `at ${company}`}
          </Typography>
          <Typography variant='body1'>{location}</Typography>
          <Button
            component={Link}
            to={`/profile/${_id}`}
            variant='contained'
            color='primary'
            className={classes.btn}
          >
            View Profile
          </Button>
        </div>
        <div>
          {skills.slice(0, 4).map((skill, index) => (
            <div key={index} className={classes.skills}>
              <CheckIcon /> {skill}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileItem;
