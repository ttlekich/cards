import { USER_SET, User } from "./user.types";

export type UserAction = ReturnType<typeof setUser>;

const setUser = (user: User | null) => {
    return {
        type: USER_SET,
        payload: user,
    };
};

export const UserAction = {
    setUser,
};
