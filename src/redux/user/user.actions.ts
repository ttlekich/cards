import {
    USER_SET,
    User,
    USER_LOGIN,
    UserInfo,
    UserLoginAction,
    UserSetAction,
} from "./user.types";

export const userSet = (user: User | null): UserSetAction => {
    return {
        type: USER_SET,
        payload: user,
    };
};

export const userLogin = (userInfo: UserInfo): UserLoginAction => {
    return {
        type: USER_LOGIN,
        payload: userInfo,
    };
};
