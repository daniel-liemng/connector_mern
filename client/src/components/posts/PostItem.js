import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Snackbar,
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

import { usePostContext } from "../../context/postContext";
import Message from "../Message";

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
}));

const PostItem = ({ post, showActions }) => {
  const classes = useStyles();

  const { _id, text, name, avatar, user, likes, comments, date } = post;

  const {
    addLike,
    removeLike,
    deletePost,
    error,
    removeAlert,
  } = usePostContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  return (
    <Container>
      {error && (
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
            type={error && error.type}
            message={error && error.msg}
          />
        </Snackbar>
      )}
      <Card className={classes.root}>
        <CardMedia className={classes.imgContainer}>
          <Avatar
            src={avatar}
            alt={name}
            className={classes.img}
            component={Link}
            to={`/profile/${user}`}
          />
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

          {showActions && (
            <div className={classes.btnGroup}>
              <IconButton
                style={{ color: "blue" }}
                onClick={() => {
                  addLike(_id);
                  if (error) {
                    setSnackbarOpen(true);
                  }
                }}
              >
                <Badge
                  badgeContent={likes.length > 0 ? likes.length : 0}
                  color='secondary'
                  children={<ThumbUpIcon fontSize='large' />}
                />
              </IconButton>
              <IconButton
                style={{ color: "grey" }}
                onClick={() => {
                  removeLike(_id);
                  if (error) {
                    setSnackbarOpen(true);
                  }
                }}
              >
                <ThumbDownIcon fontSize='large' />
              </IconButton>
              <IconButton
                style={{ color: "orange" }}
                component={Link}
                to={`/post/${_id}`}
              >
                <Badge
                  badgeContent={comments.length > 0 ? comments.length : 0}
                  color='secondary'
                  children={
                    <SupervisedUserCircleOutlinedIcon fontSize='large' />
                  }
                />
              </IconButton>

              <IconButton
                style={{ color: "red" }}
                onClick={() => {
                  deletePost(_id);
                  if (error) {
                    setSnackbarOpen(true);
                  }
                }}
              >
                <DeleteForeverIcon fontSize='large' />
              </IconButton>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

// Share this template with SinglePost, but no group of buttons
PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;
