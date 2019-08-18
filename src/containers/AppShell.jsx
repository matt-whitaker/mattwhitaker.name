import React from "react";
import Shell from "../components/shell/Shell/Shell";

export default class AppShell extends React.PureComponent {
  render() {
    return (
      <Shell>
        {this.props.children}
      </Shell>
    )
  }
}