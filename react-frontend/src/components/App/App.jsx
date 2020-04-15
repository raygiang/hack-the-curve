import React from "react";
import "../../assets/styles/global.scss";

// Import pages to route to
import Header from "../Header/Header";
import Home from "../pages/Home/Home";
import UserRegistrationForm from "../UserRegistration/UserRegistrationForm/UserRegistrationForm";
import LoginPage from "../pages/LoginPage/LoginPage";

import { Switch, Route, withRouter } from "react-router-dom";

const App = ({ history }) => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={UserRegistrationForm} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
