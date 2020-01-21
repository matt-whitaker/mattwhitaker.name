import { connect } from 'react-redux';
import React from 'react';
import PropTypes from "prop-types";

import Markdown from '../../components/common/Markdown/Markdown';
import { ArticleView } from '../../components/views/ArticleView';

import { loadCurrentArticle } from '../../ducks/articles';

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
export class Article extends React.PureComponent {
  /**
   * Fire action to load the article
   */
  componentDidMount() {
    const { match, loadCurrentArticle } = this.props;
    loadCurrentArticle(match.params[0]);
  }

  /**
   * Render the ArticleView
   *
   * @returns {*}
   */
  render() {
    const { currentArticle } = this.props;

    if (!currentArticle) {
      return <></>;
    }

    return (
      <ArticleView title={currentArticle.title}>
        <Markdown>{currentArticle.markdown}</Markdown>
      </ArticleView>
    );
  }

  static propTypes = {
    match: PropTypes.any,
    loadCurrentArticle: PropTypes.Function,

  };

  static Connected = connectArticleView(Article);
}
