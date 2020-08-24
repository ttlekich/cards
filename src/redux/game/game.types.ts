import { History } from "history";
import * as t from "io-ts";

export const Game = t.type({
    name: t.string,
    isReady: t.boolean,
});

export type Game = t.TypeOf<typeof Game>;

export const NEW_GAME = "game/new";
export type NewGameAction = {
    type: typeof NEW_GAME;
    payload: NewGamePayload;
};
export type NewGamePayload = {
    game: Partial<Game> & { name: string };
    meta: {
        history: History;
    };
};

export const GAME_UPDATE = "game/update";
export type GameUpdateAction = {
    type: typeof GAME_UPDATE;
    payload: GameUpdatePayload;
};
export type GameUpdatePayload = {
    game: Partial<Game>;
};

export const GAME_STATE_UPDATE = "game/state_update";
export type GameStateUpdateAction = {
    type: typeof GAME_STATE_UPDATE;
    payload: GameStateUpdatePayload;
};
export type GameStateUpdatePayload = {
    game: Partial<Game>;
};

export type GameAction =
    | NewGameAction
    | GameUpdateAction
    | GameStateUpdateAction;
