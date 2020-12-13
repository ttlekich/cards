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
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type User = t.TypeOf<typeof User>;
