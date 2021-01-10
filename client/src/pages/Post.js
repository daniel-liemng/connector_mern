import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Container, Button } from "@material-ui/core";

import { usePostContext } from "../context/postContext";
import Loading from "../components/Loading";
import PostItem from "../components/posts/PostItem";

const useStyles = makeStyles((theme) => ({}));

const Post = ({ match }) => {
  const classes = useStyles();

  const { getPost, post, loading } = usePostContext();

  useEffect(() => {
    getPost(match.params.id);
  }, []);

  return loading || post === null ? (
    <Loading />
  ) : (
    <Container style={{ marginTop: "2rem" }}>
      <Button component={Link} to='/posts' variant='contained' color='primary'>
        Back to Posts
      </Button>
      <PostItem post={post} showActions={false} />
    </Container>
  );
};

export default Post;
