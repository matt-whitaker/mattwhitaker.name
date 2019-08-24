import ArticleRoute from "./ArticleRoute";
import React from "react";
import RemoteResource from "../../containers/remote/RemoteResource";
import { Route } from "react-router-dom";

export default class ArticleRoutes extends React.Component {
  render() {
    return (
      <RemoteResource
        url="/articles/manifest.json"
        transform={({ articles }) => articles.map(({ slug }) => `/article/${slug}`)}
        render={(paths) => <Route exact path={paths} component={ArticleRoute} />}
      />
    );
  }
}