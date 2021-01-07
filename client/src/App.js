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
import EditProfile from "./pages/EditProfile";
import AddExperience from "./pages/AddExperience";
import AddEducation from "./pages/AddEducation";

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
        <AuthRoute exact path='/add-experience' component={AddExperience} />
        <AuthRoute exact path='/add-education' component={AddEducation} />
      </Switch>
    </Router>
  );
};

export default App;
