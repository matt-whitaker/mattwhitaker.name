import "./BodyNav.less";
import ArticleLink from "../../../routing/links/ArticleLink";
import { Link } from "react-router-dom";
import React from "react";

export default class BodyNav extends React.PureComponent {
  render() {
    return (
      <nav className="mw-body-nav">
        <ArticleLink offset={-1}/>
        <Link to="/articles"/>
        <ArticleLink offset={1}/>
      </nav>
    );
  }
}