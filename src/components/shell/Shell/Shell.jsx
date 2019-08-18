import React from "react";

import "./Shell.less";

export default class Shell extends React.PureComponent {
  render() {
    return (
      <div className="mw-shell">
        <h1>{process.env.SITE_TITLE}</h1>
        <h2>"{process.env.SITE_SUBTITLE}"</h2>
        <hr />
        {this.props.children}
      </div>
    );
  }
}