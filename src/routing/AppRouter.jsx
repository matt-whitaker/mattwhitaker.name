import React from "react";
import { BrowserRouter } from "react-router-dom";

export default class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.children}
      </BrowserRouter>
    );
  }
}