import { AppAction } from "./app.actions";
import { APP_LOADED } from "./app.types";

const INITIAL_STATE = {
    loaded: false,
};

const appReducer = (state = INITIAL_STATE, action: AppAction) => {
    switch (action.type) {
        case APP_LOADED:
            return {
                ...state,
                loaded: true,
            };
        default:
            return state;
    }
};

export type AppState = ReturnType<typeof appReducer>;

export default appReducer;
