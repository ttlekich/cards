import { History } from "history";

export interface User extends firebase.User {
    id: string;
}

export const USER_SET = "user/set";
export type UserSetAction = {
    type: typeof USER_SET;
    payload: User | null;
};

export const USER_LOGOUT = "user/logout";
export type UserLogoutAction = {
    type: typeof USER_LOGOUT;
    payload: UserLogoutPayload;
};
export type UserLogoutPayload = {
    history: History;
};

export const USER_LOGIN = "user/login";
export type UserLoginAction = {
    type: typeof USER_LOGIN;
    payload: UserLoginPayload;
};
export type UserLoginPayload = {
    email: string;
    password: string;
    history: History;
};

export const USER_REGISTER = "user/register";

export type UserAction = UserLoginAction | UserSetAction | UserLogoutAction;
