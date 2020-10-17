import * as t from "io-ts";

export const User = t.type({
    email: t.string,
    password: t.union([t.string, t.undefined]),
});

export const Users = t.array(User);

export type UserLoginInput = {
    email: string;
    password: string;
};

export type User = t.TypeOf<typeof User>;
