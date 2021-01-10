import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Button,
  Snackbar,
  Container,
  Typography,
  Paper,
  TextField,
  Badge,
  IconButton,
} from "@material-ui/core";

import { usePostContext } from "../../context/postContext";
import Message from "../Message";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1rem",
    padding: "1rem",
  },
}));

const AddPost = () => {
  const classes = useStyles();

  const { addPost, error, removeAlert } = usePostContext();

  const [text, setText] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    addPost({ text });
    if (error) {
      setSnackbarOpen(true);
    }
    setText("");
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Typography variant='h5' color='secondary'>
        Say something
      </Typography>
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

      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleAddPost}
      >
        <TextField
          placeholder='Create a post...'
          fullWidth
          rows={4}
          multiline
          style={{ margin: 8 }}
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.submitBtn}
        >
          Add Post
        </Button>
      </form>
    </Paper>
  );
};

export default AddPost;
