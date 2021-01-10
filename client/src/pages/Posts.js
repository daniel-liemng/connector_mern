import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Container, Paper } from "@material-ui/core";

import { usePostContext } from "../context/postContext";
import Loading from "../components/Loading";
import PostItem from "../components/posts/PostItem";
import AddPost from "../components/posts/AddPost";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "1rem",
  },
}));

const Posts = () => {
  const classes = useStyles();

  const { getPosts, posts, loading } = usePostContext();

  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant='h3' color='secondary' align='center'>
          Posts
        </Typography>
        <Typography variant='h6'>Welcome to the community</Typography>

        <AddPost />

        <div>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </Paper>
    </Container>
  );
};

export default Posts;
