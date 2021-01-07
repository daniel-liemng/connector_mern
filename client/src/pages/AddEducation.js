import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { useProfileContext } from "../context/profileContext";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: "3rem",
    padding: "1rem",
  },
  title: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  submitBtn: {
    marginTop: "1.5rem",
    marginBottom: "2rem",
    marginRight: "0.5rem",
  },
  buttonGroup: {
    display: "flex",
  },
}));

const AddEducation = () => {
  const classes = useStyles();
  const history = useHistory();

  const { addEducation, errors, removeAlert } = useProfileContext();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: new Date(),
    to: new Date(),
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExperience = (e) => {
    e.preventDefault();

    addEducation(formData, history);

    if (errors) {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  return (
    <Container maxWidth='sm'>
      {errors && (
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
            type={errors.length > 0 ? errors[0].type : "error"}
            message={errors.length > 0 ? errors[0].msg : null}
          />
        </Snackbar>
      )}
      <Paper elevation={0} className={classes.paper}>
        <Typography
          variant='h4'
          align='center'
          className={classes.title}
          color='primary'
        >
          Add An Education
        </Typography>
        <Typography variant='h6'>
          Add any school ot bootcamp that you have attended
        </Typography>
        <br />
        <Typography variant='subtitle1'>* is required field</Typography>

        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleAddExperience}
        >
          <TextField
            label='* School or Bootcamp'
            placeholder='School or Bootcamp'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='school'
            value={school}
            onChange={handleChange}
          />

          <TextField
            label='* Degree or Certificate'
            placeholder='Degree or Certificate'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='degree'
            value={degree}
            onChange={handleChange}
          />

          <TextField
            label='* Field of Study'
            placeholder='Field of Study'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={handleChange}
          />

          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            label='From Date'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline'
            name='from'
            value={from}
            onChange={(e, date) => setFormData({ ...formData, from: date })}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name='current'
                  checked={current}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      current: e.target.checked,
                      to: null,
                    });
                    toggleDisabled(!toDateDisabled);
                  }}
                />
              }
              label='Current'
            />
          </Box>

          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            label='To Date'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline'
            name='to'
            value={to}
            onChange={(e, date) => setFormData({ ...formData, to: date })}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            disabled={toDateDisabled}
          />

          <TextField
            label='Program Description'
            placeholder='Program Description'
            fullWidth
            rows={4}
            multiline
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='description'
            value={description}
            onChange={handleChange}
          />

          <div className={classes.buttonGroup}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitBtn}
            >
              Add Education
            </Button>
            <Button
              component={Link}
              to='/dashboard'
              variant='contained'
              color='secondary'
              className={classes.submitBtn}
            >
              Go Back
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEducation;
