import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Button,
  Snackbar,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";

import { usePostContext } from "../../context/postContext";
import Message from "../Message";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1rem",
    padding: "1rem",
  },
}));

const AddComment = ({ postId }) => {
  const classes = useStyles();

  const { addComment, error, removeAlert } = usePostContext();

  const [text, setText] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    if (error) {
      setSnackbarOpen(true);
    }
    setText("");
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Typography variant='h5' color='secondary'>
        Leave a Comment
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
        onSubmit={handleAddComment}
      >
        <TextField
          placeholder='Leave a Comment...'
          fullWidth
          rows={2}
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
          Add Comment
        </Button>
      </form>
    </Paper>
  );
};

export default AddComment;
