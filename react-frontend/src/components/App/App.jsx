import React from "react";
import "../../assets/styles/global.scss";

// Import pages to route to
import Home from "../pages/Home";
import ArticleContainer from "../ArticleContainer/ArticleContainer";

import { Switch, Route, withRouter } from "react-router-dom";

const App = ({ history }) => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={ArticleContainer} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
