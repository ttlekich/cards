import * as t from "io-ts";
import { Hand } from "../crazy-eights/deck";
import { _NOT_PLAYING, _PLAYING } from "./game-mode";

export const UserGamePlaying = t.type({
    mode: _PLAYING,
    userUID: t.string,
    email: t.string,
    hand: Hand,
    playerNumber: t.number,
});
export type UserGamePlaying = t.TypeOf<typeof UserGamePlaying>;

export const UserGameNotPlaying = t.type({
    mode: _NOT_PLAYING,
    userUID: t.string,
    email: t.string,
    playerNumber: t.number,
});
export type UserGameNotPlaying = t.TypeOf<typeof UserGameNotPlaying>;

export const UserGame = t.union([UserGamePlaying, UserGameNotPlaying]);
export type UserGame = t.TypeOf<typeof UserGame>;

export const UserGameRecordPlaying = t.record(t.string, UserGamePlaying);
export type UserGameRecordPlaying = t.TypeOf<typeof UserGameRecordPlaying>;

export const UserGameRecordNotPlaying = t.record(t.string, UserGameNotPlaying);
export type UserGameRecordNotPlaying = t.TypeOf<
    typeof UserGameRecordNotPlaying
>;

export const UserGameRecord = t.union([
    UserGameRecordNotPlaying,
    UserGamePlaying,
]);
export type UserGameRecord = t.TypeOf<typeof UserGameRecord>;
