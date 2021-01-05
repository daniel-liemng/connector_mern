import React from "react";
import { Redirect } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Home = () => {
  const { isAuthenticated } = useUserContext();

  // Redirect to Dashboard if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return <div>Home</div>;
};

export default Home;
