import { NEW_GAME, GAME_STATE_UPDATE, GameAction, Game } from "./game.types";
import produce, { Draft } from "immer";

export const DEFAULT_GAME_STATE = {
    name: "NOT_SET",
    isReady: false,
};

const gameReducer = produce((draft: Draft<GameState>, action: GameAction) => {
    const { type, payload } = action;
    switch (type) {
        case NEW_GAME:
        case GAME_STATE_UPDATE:
            return {
                ...draft,
                ...payload.game,
            };
        default:
            return draft;
    }
}, DEFAULT_GAME_STATE);

export type GameState = Game;

export default gameReducer;
