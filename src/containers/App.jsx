import React from "react";
import AppRouter from "../routing/AppRouter";
import {Route, Switch} from "react-router-dom";
import BlogRoute from "../routing/routes/BlogRoute";

export default class App extends React.Component {
  render() {
    return (
      <AppRouter>
        <h1>Matt Whitaker!</h1>
        <Switch>
          <Route path="/blog" component={BlogRoute} />
        </Switch>
      </AppRouter>
    );
  }
}