import { NEW_GAME } from "./game.types";

const newGame = (name: string) => {
    return {
        type: NEW_GAME,
        payload: name,
    };
};

export const GameAction = {
    newGame,
};

export type GameAction = ReturnType<typeof newGame>;
