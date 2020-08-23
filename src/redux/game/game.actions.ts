import {
    NEW_GAME,
    NewGamePayload,
    NewGameAction,
    GameUpdatePayload,
    GameUpdateAction,
    GAME_UPDATE,
} from "./game.types";

const newGame = (payload: NewGamePayload): NewGameAction => {
    return {
        type: NEW_GAME,
        payload,
    };
};

const gameUpdate = (payload: GameUpdatePayload): GameUpdateAction => {
    return {
        type: GAME_UPDATE,
        payload,
    };
};

export const GameAction = {
    newGame,
    gameUpdate,
};

export type GameAction =
    | ReturnType<typeof newGame>
    | ReturnType<typeof gameUpdate>;
