import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

import { useUserContext } from "../context/userContext";
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
  },
  link: {
    textDecoration: "none",
    marginLeft: "1rem",

    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const {
    registerUser,
    errors,
    setAlert,
    removeAlert,
    isAuthenticated,
  } = useUserContext();

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { name, email, password, password2 } = userInput;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  // Redirect if logged in
  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [isAuthenticated, history, redirect]);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password not match", "error");
      setSnackbarOpen(true);
    } else {
      registerUser(name, email, password);

      if (errors) {
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  // console.log("EROR", errors);

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
            type='error'
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
          Register
        </Typography>

        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleRegister}
        >
          <TextField
            label='Name'
            placeholder='Name'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='name'
            value={name}
            onChange={handleChange}
          />

          <TextField
            label='Email'
            placeholder='name@email.com'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='email'
            value={email}
            onChange={handleChange}
          />

          <TextField
            type='password'
            label='Password'
            placeholder='Password'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='password'
            value={password}
            onChange={handleChange}
          />

          <TextField
            type='password'
            label='Confirm Password'
            placeholder='Confirm Password'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='password2'
            value={password2}
            onChange={handleChange}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submitBtn}
          >
            Register
          </Button>
        </form>

        <Typography variant='h6'>
          Already have an account?{" "}
          <Link to='/login' className={classes.link}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
