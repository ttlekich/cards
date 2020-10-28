import * as t from "io-ts";
import { Deck } from "../crazy-eights/deck";
import { User } from "./user";

export const Game = t.type({
    id: t.string,
    users: t.array(User),
    deck: Deck,
});

export type Game = t.TypeOf<typeof Game>;
