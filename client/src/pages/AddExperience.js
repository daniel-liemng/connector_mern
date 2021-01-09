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

const AddExperience = () => {
  const classes = useStyles();
  const history = useHistory();

  const { addExperience, errors, removeAlert } = useProfileContext();

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: new Date(),
    to: new Date(),
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExperience = (e) => {
    e.preventDefault();

    addExperience(formData, history);

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
          Add An Experience
        </Typography>
        <Typography variant='h6'>
          Add any developer/programming positions that you have had in the past
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
            label='* Job Title'
            placeholder='Job Title'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='title'
            value={title}
            onChange={handleChange}
          />

          <TextField
            label='* Company'
            placeholder='Company'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='company'
            value={company}
            onChange={handleChange}
          />

          <TextField
            label='Location'
            placeholder='Location'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='location'
            value={location}
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
            minDate='null'
            name='to'
            value={to}
            onChange={(e, date) => setFormData({ ...formData, to: date })}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            disabled={toDateDisabled}
          />

          <TextField
            label='Job Description'
            placeholder='Job Description'
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
              Add Experience
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

export default AddExperience;
