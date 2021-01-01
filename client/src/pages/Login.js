import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

import { useUserContext } from "../context/userContext";
import Message from "../components/Message";
import Loading from "../components/Loading";

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

const Login = ({ history, location }) => {
  const classes = useStyles();

  const {
    // user,
    // user_register_loading: loading,
    // user_register_error: error,
    loginUser,
  } = useUserContext();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInput;

  const [message, setMessage] = useState(null);

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  // useEffect(() => {
  //   if (user) {
  //     history.push(redirect);
  //   }
  // }, [history, redirect, user]);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(email, password);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage(null);
  };

  // console.log("error", message);
  // console.log("123register", error);

  // console.log("aa", userInput);

  return (
    <Container maxWidth='sm'>
      <Paper elevation={0} className={classes.paper}>
        <Typography
          variant='h4'
          align='center'
          className={classes.title}
          color='primary'
        >
          Login
        </Typography>

        {/* {message && (
          <Message
            open={message ? true : false}
            handleClose={handleSnackbarClose}
            message={message}
            type='error'
          />
        )} */}

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
