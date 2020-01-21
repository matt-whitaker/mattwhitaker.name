import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { reducer as articlesReducer, epic as articlesEpic } from './articles';

export const rootReducer = combineReducers({
  articles: articlesReducer,
});

export const rootEpic = combineEpics(
  articlesEpic,
);
