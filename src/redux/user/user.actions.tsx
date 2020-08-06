import { SET_USER, User } from "./user.types";

export type UserAction = ReturnType<typeof setUser>;

const setUser = (user: User | null) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const UserAction = {
    setUser,
};
