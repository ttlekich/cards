export interface User extends firebase.User {
    id: string;
}

export const USER_SET = "USER_SET";

export const USER_LOGIN = "USER_LOGIN";

export const USER_REGISTER = "USER_REGISTER";
