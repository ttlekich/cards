import * as t from "io-ts";

export const User = t.type({
    email: t.string,
});

export const Users = t.array(User);

export type User = t.TypeOf<typeof User>;
