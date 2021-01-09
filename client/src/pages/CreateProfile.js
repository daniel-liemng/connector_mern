import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Typography,
  InputAdornment,
  MenuItem,
  Collapse,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

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

const CreateProfile = () => {
  const classes = useStyles();
  const history = useHistory();

  const { createProfile, errors, removeAlert } = useProfileContext();

  const [socialToggle, setSocialToggle] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCreateProfile = (e) => {
    e.preventDefault();
    createProfile(formData, history);

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

  const socialInput = () => (
    <>
      <TextField
        fullWidth
        style={{ margin: 8 }}
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <TwitterIcon style={{ color: "#1DA1F2" }} />
            </InputAdornment>
          ),
        }}
        name='twitter'
        value={twitter}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        style={{ margin: 8 }}
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <FacebookIcon style={{ color: "#4267B2" }} />
            </InputAdornment>
          ),
        }}
        name='facebook'
        value={facebook}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        style={{ margin: 8 }}
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <YouTubeIcon style={{ color: "#FF0000" }} />
            </InputAdornment>
          ),
        }}
        name='youtube'
        value={youtube}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        style={{ margin: 8 }}
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LinkedInIcon style={{ color: "#0077B5" }} />
            </InputAdornment>
          ),
        }}
        name='linkedin'
        value={linkedin}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        style={{ margin: 8 }}
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <InstagramIcon style={{ color: "#C13584" }} />
            </InputAdornment>
          ),
        }}
        name='instagram'
        value={instagram}
        onChange={handleChange}
      />
    </>
  );

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
          Create Your Profile
        </Typography>
        <Typography variant='h6'>
          Let's get some information to make your profile stand out
        </Typography>
        <br />
        <Typography variant='subtitle1'>* is required field</Typography>

        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleCreateProfile}
        >
          <TextField
            label='* Status'
            select
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            name='status'
            value={status}
            onChange={handleChange}
            helperText='Please select your professional status'
          >
            <MenuItem value='Developer'>Developer</MenuItem>
            <MenuItem value='Junior Developer'>Junior Developer</MenuItem>
            <MenuItem value='Senior Developer'>Senior Developer</MenuItem>
            <MenuItem value='Manager'>Manager</MenuItem>
            <MenuItem value='Student or Learning'>Student or Learning</MenuItem>
            <MenuItem value='Instructor'>Instructor</MenuItem>
            <MenuItem value='Intern'>Intern</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </TextField>
          <TextField
            label='Company'
            placeholder='ABC Company'
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
            label='Website'
            placeholder='abcCompany.com'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='website'
            value={website}
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
          <TextField
            label='* Skills'
            placeholder='* Skills'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='skills'
            value={skills}
            onChange={handleChange}
          />
          <TextField
            label='Github Username'
            placeholder='Github Username'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='githubusername'
            value={githubusername}
            onChange={handleChange}
          />
          <TextField
            label='Bio'
            placeholder='A short bio of yourself'
            fullWidth
            rows={4}
            multiline
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='bio'
            value={bio}
            onChange={handleChange}
          />

          <Button
            onClick={() => setSocialToggle(!socialToggle)}
            variant='contained'
            color='secondary'
          >
            Add Social Media Links
          </Button>

          <Collapse in={socialToggle}>{socialInput()}</Collapse>

          <div className={classes.buttonGroup}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitBtn}
            >
              Create Profile
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

export default CreateProfile;
