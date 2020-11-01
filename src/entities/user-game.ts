import * as t from "io-ts";
import { Hand } from "../crazy-eights/deck";

export const UserGame = t.type({
    email: t.string,
    isReady: t.boolean,
    hand: Hand,
    playerNumber: t.number,
});
export type UserGame = t.TypeOf<typeof UserGame>;

export const UserGameRecord = t.record(t.string, UserGame);
export type UserGameRecord = t.TypeOf<typeof UserGameRecord>;
