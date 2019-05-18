import React from "react";
import ReactMarkdown from "react-markdown";

export default class Markdown extends React.PureComponent {
  render() {
    return (
      <div className="mw-markdown">
        <ReactMarkdown source={this.props.children} />
      </div>
    );
  }
}