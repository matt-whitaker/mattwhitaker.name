import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ArticleRoutes } from './ArticleRoutes';
import Home from '../../pages/Home/Home';

/**
 * AppRoutes
 *
 * Root component for routes.
 *
 * Usage:
 * ```
 * <AppRoutes />
 * ```
 *
 * @returns {*}
 */
export const AppRoutes = () => (
  <Switch>
    <Route path="/article" component={ArticleRoutes.Connected}/>
    <Route path="/" component={Home}/>
  </Switch>
);
