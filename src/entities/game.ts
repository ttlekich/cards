import * as t from "io-ts";

export const Game = t.type({
    id: t.string,
});

export type Game = t.TypeOf<typeof Game>;
