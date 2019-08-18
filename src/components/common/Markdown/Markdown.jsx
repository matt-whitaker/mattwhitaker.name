import React from "react";
import ReactMarkdown from "react-markdown";

import "./Markdown.less";

export default class Markdown extends React.PureComponent {
  render() {

    return (
      <div className="mw-markdown markdown-body">
        <ReactMarkdown source={this.props.children} />
      </div>
    );
  }
}