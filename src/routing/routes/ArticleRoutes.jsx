import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Article } from '../../pages/Article/Article';

/**
 * Provide articles manifest to ArticleRoutes
 */
export const connectArticleRoutes = connect(
  ({ articles }) => ({ manifest: articles.manifest }),
);


/**
 * ArticleRoutes
 *
 * Load manifest and generate routes
 *
 * Usage:
 * ```
 * <ArticleRoutes />
 * ```
 *
 * @returns {*}
 */
export const ArticleRoutes = ({ manifest }) => (
  <Route
    exact
    path={manifest ? manifest.paths: []}
    render={() => (
      <Route path='/article/*' component={Article.Connected} />
    )}
  />
);

ArticleRoutes.propTypes = {
  manifest: PropTypes.object.isRequired,
};

ArticleRoutes.Connected = connectArticleRoutes(ArticleRoutes);
