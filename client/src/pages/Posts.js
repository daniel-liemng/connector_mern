import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";
import { Typography, Container, Button, Grid } from "@material-ui/core";

import { usePostContext } from "../context/postContext";
import Loading from "../components/Loading";

const Posts = () => {
  const { getPosts, posts, loading } = usePostContext();

  useEffect(() => {
    getPosts();
  }, []);

  return <div></div>;
};

export default Posts;
