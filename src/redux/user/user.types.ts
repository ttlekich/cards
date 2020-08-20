export interface User extends firebase.User {
    id: string;
}

export const USER_SET = "USER_SET";
export type UserSetAction = {
    type: typeof USER_SET;
    payload: User | null;
};

export const USER_LOGIN = "USER_LOGIN";
export type UserLoginAction = {
    type: typeof USER_LOGIN;
    payload: UserInfo;
};
export type UserInfo = {
    email: string;
    password: string;
};

export const USER_REGISTER = "USER_REGISTER";

export type UserAction = UserLoginAction | UserSetAction;
