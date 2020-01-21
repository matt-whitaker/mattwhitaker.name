import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";

import { rootEpic, rootReducer } from "./ducks";

const epicMiddleware = createEpicMiddleware();
const loggerMiddleware = createLogger();

export const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, epicMiddleware));

epicMiddleware.run(rootEpic);