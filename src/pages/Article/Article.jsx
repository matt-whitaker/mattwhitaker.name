import { connect } from 'react-redux';
import React from 'react';

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

  static Connected = connectArticleView(Article);
}