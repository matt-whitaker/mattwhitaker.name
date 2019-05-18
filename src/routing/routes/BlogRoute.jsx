import React from "react";
import {Route} from "react-router-dom";
import LoadableMarkdown from "../../components/Markdown/LoadableMarkdown";

export default class BlogRoute extends React.Component {
  render() {
    return <Route path="/blog/:slug" render={({ match }) => {
      return <LoadableMarkdown url={`/blogs/${match.params.slug}.md`} />;
    }} />;
  }
}