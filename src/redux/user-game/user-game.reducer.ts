import { UserGameAction } from "./user-game.actions";
import { GameAction } from "../game/game.actions";
import { NEW_GAME } from "../game/game.types";

const INITIAL_STATE = {
    name: "",
};

const gameReducer = (
    state = INITIAL_STATE,
    action: GameAction | UserGameAction
) => {
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
