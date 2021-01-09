import React, { useEffect } from "react";
import { Link, makeStyles } from "@material-ui/core";
import { Typography, Paper } from "@material-ui/core";

import { useProfileContext } from "../../context/profileContext";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    padding: "1rem",
  },
  repoTop: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid black",
    marginTop: "0.7rem",
    marginBottom: "0.7rem",
    padding: "0.5rem",
  },
  star: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "0.3rem",
    marginBottom: "0.4rem",
  },
  watcher: {
    backgroundColor: "#bdbdbd",
    color: "white",
    padding: "0.3rem",
    marginBottom: "0.4rem",
  },
  fork: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    padding: "0.3rem",
    marginBottom: "0.4rem",
  },
}));

const ProfileGithub = ({ username }) => {
  const classes = useStyles();

  const { getGithubRepos, repos } = useProfileContext();

  useEffect(() => {
    getGithubRepos(username);
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography
        variant='h3'
        align='center'
        color='primary'
        style={{ marginBottom: "1rem" }}
      >
        Github Reporatories
      </Typography>

      {repos === null ? (
        <Loading />
      ) : (
        repos.map((repo, index) => (
          <div className={classes.repoTop} key={index}>
            <div>
              <Typography variant='h5'>
                <Link
                  href={repo.html_url}
                  target='_blank'
                  rel='noreferrer'
                  color='secondary'
                >
                  {repo.name}
                </Link>
              </Typography>
              <Typography variant='body1'>{repo.description}</Typography>
            </div>
            <div className={classes.repoRight}>
              <Typography variant='body2' className={classes.star}>
                <strong>Stars:</strong> {repo.stargazers_count}
              </Typography>
              <Typography variant='body2' className={classes.watcher}>
                <strong>Watchers:</strong> {repo.watchers_count}
              </Typography>
              <Typography variant='body2' className={classes.fork}>
                <strong>Forks:</strong> {repo.forks_count}
              </Typography>
            </div>
          </div>
        ))
      )}
    </Paper>
  );
};

export default ProfileGithub;
