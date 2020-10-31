import * as t from "io-ts";
import { Deck } from "../crazy-eights/deck";
import { UserGame, UserGameRecord } from "./user-game";

export const Game = t.type({
    id: t.string,
    userGameRecord: UserGameRecord,
    deck: Deck,
});

export type Game = t.TypeOf<typeof Game>;
