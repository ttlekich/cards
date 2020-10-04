import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import gameReducer from "./game/game.reducer";
import appReducer from "./app/app.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
