import axios from 'axios';

import { combineEpics, ofType } from 'redux-observable';
import { delayWhen, map, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { combineReducers } from 'redux';

import { INITIALIZE } from './initialize';

// =====================================================================================================================
// Types

export const LOAD_ARTICLES_MANIFEST = 'LOAD_ARTICLES_MANIFEST';
export const LOAD_CURRENT_ARTICLE = 'LOAD_CURRENT_ARTICLE';
export const CACHE_ARTICLE = 'CACHE_ARTICLE';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const SET_MANIFEST = 'SET_MANIFEST';

// =====================================================================================================================
// Actions

/**
 * Init the lifecycle for loading the articles manifest
 *
 * @returns {{type: string}}
 */
export const loadArticlesManifest = () => ({ type: LOAD_ARTICLES_MANIFEST });

/**
 * Init the lifecycle for loading a specific article
 *
 * @param slug
 * @returns {{type: string, slug: string}}
 */
export const loadCurrentArticle = (slug) => ({ type: LOAD_CURRENT_ARTICLE, slug });

/**
 * Update (or insert) the cache's copy of the article
 *
 * @param slug
 * @param article
 * @returns {{type: string, article: {}}}
 */
export const cacheArticle = (slug, article) => ({ type: CACHE_ARTICLE, slug, article });

/**
 * Set the article currently being viewed
 *
 * @param slug
 * @param article
 * @returns {{type: string, article: {}}}
 */
export const setCurrentArticle = (slug, article) => ({ type: SET_CURRENT_ARTICLE, slug, article });

/**
 * Set the articles manifest
 *
 * @param manifest
 * @returns {{type: string, manifest: {}}}
 */
export const setManifest = (manifest) => ({ type: SET_MANIFEST, manifest });

// =====================================================================================================================
// Reducers

/**
 * Reducer for the current article
 *
 * @param state
 * @param action
 */
export const currentArticle = (state = null, action) => {
  if (action.type === SET_CURRENT_ARTICLE) {
    return action.article;
  }

  return state;
};

/**
 * Reducer for the cache
 *
 * @param state
 * @param action
 * @returns {{}}
 */
export const cache = (state = {}, action) => {
  if (action.type === CACHE_ARTICLE) {
    return {
      [action.article.slug]: action.article,
      ...state,
    };
  }

  return state;
};

/**
 * Reducer for the manfest
 *
 * @param state
 * @param action
 * @returns {{}}
 */
export const manifest = (state = null, action) => {
  if (action.type === SET_MANIFEST) {
    return action.manifest;
  }

  return state;
};

export const reducer = combineReducers({ currentArticle, cache, manifest });

// =====================================================================================================================
// Epics

export const triggerLoadArticlesManifest = (action$) =>
  action$.pipe(
    ofType(INITIALIZE),
    map(() => loadArticlesManifest()),
  );

/**
 * Makes a request for the article, or loads from the cache
 *
 * @param action$
 * @param state$
 * @returns {*}
 */
export const requestCurrentArticle = (action$, state$) =>
  action$.pipe(
    ofType(LOAD_CURRENT_ARTICLE),
    mergeMap(({ slug }) => {
      const { articles } = state$.value;

      // If it's already loaded, just use it
      if (articles.cache[slug]) {
        return of(setCurrentArticle(state.articles.cache[slug]));
      }

      return from(axios.get(`/articles/${slug}.md`))
        .pipe(
          // If the manifest hasn't loaded yet, delay until it has, otherwise do nothing
          articles.manifest ? tap() : delayWhen(action$.pipe(ofType(SET_MANIFEST), take(1))),
          mergeMap(({ data }) => {
            const article = {
              title: articles.manifest.index.get(slug).title,
              markdown: data,
            };

            return from([
              setCurrentArticle(slug, article),
              cacheArticle(slug, article),
            ]);
          }),
        );
    }),
  );

/**
 * Makes a request for the articles manifest
 *
 * @param action$
 * @returns {*}
 */
export const requestArticlesManifest = (action$) =>
  action$.pipe(
    ofType(LOAD_ARTICLES_MANIFEST),
    mergeMap(() =>
      from(axios.get('/articles/manifest.json'))
        .pipe(
          map(({ data: manifest }) => setManifest({
            ...manifest,
            index: manifest.articles.reduce((map, article) => {
              return map.set(article.slug, article);
            }, new Map()),
            paths: manifest.articles.map(({ slug }) => `/article/${slug}`),
          })),
        ),
    ),
  );

export const epic = combineEpics(triggerLoadArticlesManifest, requestCurrentArticle, requestArticlesManifest);

// =====================================================================================================================
