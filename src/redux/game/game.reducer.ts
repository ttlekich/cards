import { GameAction } from "./game.actions";
import { NEW_GAME } from "./game.types";

const INITIAL_STATE = {
    name: "",
};

const gameReducer = (state = INITIAL_STATE, action: GameAction) => {
    switch (action.type) {
        case NEW_GAME:
            return {
                ...state,
                name: action.payload,
            };
        default:
            return state;
    }
};

export type GameState = ReturnType<typeof gameReducer>;

export default gameReducer;
