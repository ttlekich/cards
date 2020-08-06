import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import gameReducer from "./game/game.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
