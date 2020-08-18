import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root.reducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

// TODO -- use dev tools only in dev

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
