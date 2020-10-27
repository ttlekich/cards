import * as t from "io-ts";
import { User } from "./user";

export const Game = t.type({
    id: t.string,
    users: t.array(User),
});

export type Game = t.TypeOf<typeof Game>;
