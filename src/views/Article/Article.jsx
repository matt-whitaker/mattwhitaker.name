import { connect } from "react-redux";
import React from "react";

import Markdown from "../../components/common/Markdown/Markdown";

import { loadCurrentArticle } from "../../ducks/articles";

import "./Article.less";

/**
 * Provide state and actions to ArticleView
 */
export const connectArticleView = connect(
  ({ articles }) => ({ currentArticle: articles.currentArticle }),
  { loadCurrentArticle },
);

/**
 * ArticleView view
 */
export default connectArticleView(class Article extends React.PureComponent {
  componentDidMount() {
    const { match, loadCurrentArticle } = this.props;
    loadCurrentArticle(match.params[0]);
  }

  /**
   * Render the ArticleView
   * @returns {*}
   */
  render() {
    const { currentArticle } = this.props;

    if (!currentArticle) {
      return <></>;
    }

    /**
     * TODO Create re-usable view component to extract DOM references
     */
    return (
      <div className="mw-article">
        <h1 className="mw-article-title">{currentArticle.title}</h1>
        <Markdown>{currentArticle.markdown}</Markdown>
      </div>
    );
  }
});