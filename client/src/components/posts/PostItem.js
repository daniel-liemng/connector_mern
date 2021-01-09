import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Button,
  Container,
  Typography,
  Badge,
  IconButton,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Moment from "react-moment";

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
    minWidth: "12rem",
  },
  img: {
    width: "8rem",
    height: "8rem",
  },
  btnGroup: {
    display: "flex",
    alignItems: "center",
  },
  btn: {
    marginRight: "0.5rem",
  },
  skills: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    color: theme.palette.secondary.main,
  },
}));

const PostItem = ({ post }) => {
  const classes = useStyles();

  const { _id, text, name, avatar, user, likes, comments, date } = post;

  return (
    <Container>
      <Card className={classes.root}>
        <CardMedia className={classes.imgContainer}>
          <Avatar src={avatar} alt={name} className={classes.img} />
          <Typography variant='h6' color='secondary'>
            {name}
          </Typography>
        </CardMedia>
        <CardContent>
          <Typography variant='h5'>{text}</Typography>
          <Typography
            variant='body2'
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </Typography>

          <div className={classes.btnGroup}>
            <IconButton style={{ color: "blue" }}>
              <Badge
                badgeContent={likes.length > 0 ? likes.length : 0}
                color='secondary'
                children={<ThumbUpIcon fontSize='large' />}
              />
            </IconButton>
            <IconButton style={{ color: "grey" }}>
              <Badge
                badgeContent={likes.length > 0 ? likes.length : 0}
                color='secondary'
                children={<ThumbDownIcon fontSize='large' />}
              />
            </IconButton>
            <IconButton style={{ color: "orange" }}>
              <Badge
                badgeContent={comments.length > 0 ? comments.length : 0}
                color='secondary'
                children={<SupervisedUserCircleOutlinedIcon fontSize='large' />}
              />
            </IconButton>

            <IconButton style={{ color: "red" }}>
              <DeleteForeverIcon fontSize='large' />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostItem;
