import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useUserContext } from "./context/userContext";
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
import Profiles from "./pages/Profiles";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

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
        <Route path='/profiles' component={Profiles} />
        <Route path='/profile/:id' component={Profile} />
        <AuthRoute exact path='/dashboard' component={Dashboard} />
        <AuthRoute exact path='/create-profile' component={CreateProfile} />
        <AuthRoute exact path='/edit-profile' component={EditProfile} />
        <AuthRoute exact path='/add-experience' component={AddExperience} />
        <AuthRoute exact path='/add-education' component={AddEducation} />
        <AuthRoute path='/posts' component={Posts} />
        <AuthRoute path='/post/:id' component={Post} />
      </Switch>
    </Router>
  );
};

export default App;
