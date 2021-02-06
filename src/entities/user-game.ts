import * as t from "io-ts";
import { Hand } from "../crazy-eights/deck";
import { _FINISHED, _NOT_PLAYING, _PLAYING } from "./game-mode";

export const UserGamePlaying = t.type({
    mode: _PLAYING,
    userUID: t.string,
    email: t.string,
    hand: Hand,
    playerNumber: t.number,
    score: t.number,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGamePlaying = t.TypeOf<typeof UserGamePlaying>;

export const UserGameNotPlaying = t.type({
    mode: _NOT_PLAYING,
    userUID: t.string,
    email: t.string,
    playerNumber: t.number,
    score: t.number,
    ready: t.boolean,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGameNotPlaying = t.TypeOf<typeof UserGameNotPlaying>;

export const UserGameFinished = t.type({
    mode: _FINISHED,
    userUID: t.string,
    email: t.string,
    playerNumber: t.number,
    score: t.number,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGameFinished = t.TypeOf<typeof UserGameFinished>;

export const UserGame = t.union([
    UserGamePlaying,
    UserGameNotPlaying,
    UserGameFinished,
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGame = t.TypeOf<typeof UserGame>;

export const UserGameRecordPlaying = t.record(t.string, UserGamePlaying);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGameRecordPlaying = t.TypeOf<typeof UserGameRecordPlaying>;

export const UserGameRecordNotPlaying = t.record(t.string, UserGameNotPlaying);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGameRecordNotPlaying = t.TypeOf<
    typeof UserGameRecordNotPlaying
>;

export const UserGameRecordFinished = t.record(t.string, UserGameFinished);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGameRecordFinished = t.TypeOf<typeof UserGameRecordFinished>;

export const UserGameRecord = t.union([
    UserGameRecordNotPlaying,
    UserGameRecordPlaying,
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type UserGameRecord = t.TypeOf<typeof UserGameRecord>;
