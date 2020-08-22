import { History } from "history";

export interface User extends firebase.User {
    id: string;
}

export const USER_SET = "USER_SET";
export type UserSetAction = {
    type: typeof USER_SET;
    payload: User | null;
};

export const USER_LOGOUT = "USER_LOGOUT";
export type UserLogoutAction = {
    type: typeof USER_LOGOUT;
    payload: UserLogoutPayload;
};
export type UserLogoutPayload = {
    history: History;
};

export const USER_LOGIN = "USER_LOGIN";
export type UserLoginAction = {
    type: typeof USER_LOGIN;
    payload: UserLoginPayload;
};
export type UserLoginPayload = {
    email: string;
    password: string;
    history: History;
};

export const USER_REGISTER = "USER_REGISTER";

export type UserAction = UserLoginAction | UserSetAction | UserLogoutAction;
