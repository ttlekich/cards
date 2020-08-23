import { History } from "history";
import * as t from "io-ts";

export const Game = t.type({
    name: t.string,
});

export type Game = t.TypeOf<typeof Game>;

export const NEW_GAME = "game/new";
export type NewGameAction = {
    type: typeof NEW_GAME;
    payload: NewGamePayload;
};
export type NewGamePayload = {
    history: History;
    name: string;
};

export const GAME_UPDATE = "game/update";
export type GameUpdateAction = {
    type: typeof GAME_UPDATE;
    payload: GameUpdatePayload;
};
export type GameUpdatePayload = {
    game: Game;
};

export type GameAction = NewGameAction;
