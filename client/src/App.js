import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useUserContext } from "./context/userContext";
import setAuthToken from "./utils/setAuthToken";
import AuthRoute from "./utils/AuthRoute";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";

const App = () => {
  const { loadUser, token } = useUserContext();

  useEffect(() => {
    loadUser();
  }, [token]);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <AuthRoute exact path='/dashboard' component={Dashboard} />
        <AuthRoute exact path='/create-profile' component={CreateProfile} />
      </Switch>
    </Router>
  );
};

export default App;
