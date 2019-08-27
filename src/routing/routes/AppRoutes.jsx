import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleRoutes from "./ArticleRoutes";
import HomeView from "../../views/Banner/Banner";

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
        <Route path="/" component={HomeView} />
        <Route path="/article" component={ArticleRoutes} />
      </Switch>
    );
  }
}