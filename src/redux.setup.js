import { applyMiddleware, combineReducers, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";

import { reducer as articlesReducer, epic as articlesEpic } from "./ducks/articles";

const epicMiddleware = createEpicMiddleware();
const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  articles: articlesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, epicMiddleware));

epicMiddleware.run(combineEpics(articlesEpic));