import React from "react";
import { Route } from "react-router-dom";
import LoadableMarkdown from "../../components/common/Markdown/LoadableMarkdown";

export default class ArticleRoute extends React.Component {
  render() {
    return <Route path="/article/*" render={({ match }) => {
      return <LoadableMarkdown url={`/articles/${match.params[0]}/index.md`} />;
    }} />;
  }
}