import * as t from "io-ts";
import { Deck } from "../crazy-eights/deck";
import { _NOT_PLAYING, _PLAYING } from "./game-mode";
import { UserGameRecordNotPlaying, UserGameRecordPlaying } from "./user-game";

export const CLOCKWISE = "CLOCKWISE" as const;
const _CLOCKWISE = t.literal(CLOCKWISE);
export const COUNTER_CLOCKWISE = "COUNTER_CLOCKWISE" as const;
const _COUNTER_CLOCKWISE = t.literal(COUNTER_CLOCKWISE);

export const PlayDirection = t.union([_CLOCKWISE, _COUNTER_CLOCKWISE]);

export const GamePlaying = t.type({
    mode: _PLAYING,
    id: t.string,
    userGameRecord: UserGameRecordPlaying,
    deck: Deck,
    discard: Deck,
    currentPlayerNumber: t.number,
    nextPlayerNumber: t.number,
    playDirection: PlayDirection,
});

export type GamePlaying = t.TypeOf<typeof GamePlaying>;

export const GameNotPlaying = t.type({
    mode: _NOT_PLAYING,
    id: t.string,
    userGameRecord: UserGameRecordNotPlaying,
});

export type GameNotPlaying = t.TypeOf<typeof GameNotPlaying>;

export const Game = t.union([GamePlaying, GameNotPlaying]);

export type Game = t.TypeOf<typeof Game>;
