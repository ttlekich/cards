import {
    NEW_GAME,
    NewGamePayload,
    NewGameAction,
    GameUpdatePayload,
    GameUpdateAction,
    GAME_UPDATE,
    GameStateUpdatePayload,
    GameStateUpdateAction,
    GAME_STATE_UPDATE,
} from "./game.types";

export const newGame = (payload: NewGamePayload): NewGameAction => {
    return {
        type: NEW_GAME,
        payload,
    };
};

export const gameUpdate = (payload: GameUpdatePayload): GameUpdateAction => {
    return {
        type: GAME_UPDATE,
        payload,
    };
};

export const gameStateUpdate = (
    payload: GameStateUpdatePayload
): GameStateUpdateAction => {
    return {
        type: GAME_STATE_UPDATE,
        payload,
    };
};
