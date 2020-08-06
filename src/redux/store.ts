import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./root.reducer";

const middlewares = [logger];

// TODO -- use dev tools only in dev

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
