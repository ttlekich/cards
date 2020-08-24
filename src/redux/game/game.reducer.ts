import { NEW_GAME, GAME_STATE_UPDATE, GameAction, Game } from "./game.types";

export const DEFAULT_GAME_STATE = {
    name: "NOT_SET",
    isReady: false,
};

const gameReducer = (
    state = DEFAULT_GAME_STATE,
    action: GameAction
): GameState => {
    switch (action.type) {
        case NEW_GAME:
        case GAME_STATE_UPDATE:
            return {
                ...state,
                ...action.payload.game,
            };
        default:
            return state;
    }
};

export type GameState = Game;

export default gameReducer;
