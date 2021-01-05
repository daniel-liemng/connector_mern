import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useUserContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
