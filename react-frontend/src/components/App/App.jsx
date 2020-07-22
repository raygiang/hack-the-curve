import React from "react";
import "../../assets/styles/global.scss";

// Import pages to route to
import Header from "../Header/Header";
import Home from "../pages/Home/Home";

import { Switch, Route, withRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ProfilePage from "../pages/Profile/ProfilePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

const App = ({ history }) => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/reset-password" component={ResetPassword} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
