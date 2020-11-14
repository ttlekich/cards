import * as t from "io-ts";
import { Deck } from "../crazy-eights/deck";
import { UserGameRecord } from "./user-game";

export const Game = t.type({
    id: t.string,
    userGameRecord: UserGameRecord,
    deck: Deck,
    discard: Deck,
    isPlaying: t.boolean,
    // currentPlayer
});

export type Game = t.TypeOf<typeof Game>;
