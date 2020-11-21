import * as t from "io-ts";

export const User = t.type({
    uid: t.string,
    email: t.string,
});

export const Users = t.array(User);

export type UserLoginInput = {
    email: string;
    password: string;
};

export type User = t.TypeOf<typeof User>;
