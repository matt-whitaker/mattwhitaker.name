import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleRoutes from "./ArticleRoutes";
import Home from "../../views/Home/Home";

/**
 * AppRoutes
 *
 * Root component for routes.
 *
 * Usage:
 * ```
 * <AppRoutes />
 * ```
 */
export default class AppRoutes extends React.PureComponent {
  /**
   * @returns {React.Element} The root routes
   * @returns {*}
   */
  render() {
    return (
      <Switch>
        <Route path="/article" component={ArticleRoutes} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
}