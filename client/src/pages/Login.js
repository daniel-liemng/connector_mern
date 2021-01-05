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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const { loginUser, errors, removeAlert, isAuthenticated } = useUserContext();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { email, password } = userInput;

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
  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(email, password);

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
          Login
        </Typography>

        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleLogin}
        >
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

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submitBtn}
          >
            Login
          </Button>
        </form>

        <Typography variant='h6'>
          Don't have an account?{" "}
          <Link to='/register' className={classes.link}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
