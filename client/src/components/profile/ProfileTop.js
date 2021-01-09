import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Avatar, Paper, Link } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
  },
  img: {
    width: "15rem",
    height: "15rem",
  },
  socialBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const ProfileTop = ({ profile }) => {
  const classes = useStyles();

  const {
    user: { name, avatar },
    status,
    company,
    location,
    website,
    social,
  } = profile;

  return (
    <Paper className={classes.root}>
      <Avatar alt={name} src={avatar} className={classes.img} />
      <Typography variant='h2'>{name}</Typography>
      <Typography variant='h6'>
        {status} {company && `at ${company}`}
      </Typography>
      {location && <Typography variant='body1'>{location}</Typography>}
      <div className={classes.socialBtn}>
        {website && (
          <Link href={website} target='_blank' rel='noreferrer'>
            <LanguageIcon fontSize='large' />
          </Link>
        )}
        {social && social.twitter && (
          <Link href={social.twitter} target='_blank' rel='noreferrer'>
            <TwitterIcon style={{ color: "#1DA1F2" }} fontSize='large' />
          </Link>
        )}
        {social && social.facebook && (
          <Link href={social.facebook} target='_blank' rel='noreferrer'>
            <FacebookIcon style={{ color: "#4267B2" }} fontSize='large' />
          </Link>
        )}
        {social && social.linkedin && (
          <Link href={social.linkedin} target='_blank' rel='noreferrer'>
            <LinkedInIcon style={{ color: "#0077B5" }} fontSize='large' />
          </Link>
        )}

        {social && social.youtube && (
          <Link href={social.youtube} target='_blank' rel='noreferrer'>
            <YouTubeIcon style={{ color: "#FF0000" }} fontSize='large' />
          </Link>
        )}

        {social && social.instagram && (
          <Link href={social.instagram} target='_blank' rel='noreferrer'>
            <InstagramIcon style={{ color: "#C13584" }} fontSize='large' />
          </Link>
        )}
      </div>
    </Paper>
  );
};

export default ProfileTop;
