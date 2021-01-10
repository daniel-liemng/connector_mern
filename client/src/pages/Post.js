import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "@material-ui/core";

import { usePostContext } from "../context/postContext";
import Loading from "../components/Loading";
import PostItem from "../components/posts/PostItem";
import AddComment from "../components/post/AddComment";
import CommentItem from "../components/post/CommentItem";

const Post = ({ match }) => {
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

      <AddComment postId={post._id} />

      <div>
        {post.comments.map((comm) => (
          <CommentItem key={comm._id} comment={comm} postId={post._id} />
        ))}
      </div>
    </Container>
  );
};

export default Post;
