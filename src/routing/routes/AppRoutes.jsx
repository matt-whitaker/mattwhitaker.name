import ArticleRoute from "./ArticleRoute";
import React from "react";
import { Route, Switch } from "react-router-dom";

export default class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/article" component={ArticleRoute} />
      </Switch>
    );
  }
}