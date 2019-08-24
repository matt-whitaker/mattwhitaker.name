import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleRoutes from "./ArticleRoutes";

export default class AppRoutes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/article" component={ArticleRoutes} />
      </Switch>
    );
  }
}