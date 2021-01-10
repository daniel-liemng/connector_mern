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
  IconButton,
} from "@material-ui/core";

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
}));

const CommentItem = ({ comment, postId }) => {
  const classes = useStyles();

  const { _id, text, name, avatar, user, date } = comment;

  const { error, deleteComment, removeAlert } = usePostContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  const handleDeleteComment = (postId, _id) => {
    deleteComment(postId, _id);

    if (error) {
      setSnackbarOpen(true);
    }
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

          <IconButton
            style={{ color: "red" }}
            onClick={() => handleDeleteComment(postId, _id)}
          >
            <DeleteForeverIcon fontSize='large' />
          </IconButton>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CommentItem;
