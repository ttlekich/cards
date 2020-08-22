import {
    USER_SET,
    User,
    USER_LOGIN,
    UserLoginAction,
    UserSetAction,
    UserLoginPayload,
    UserLogoutAction,
    USER_LOGOUT,
    UserLogoutPayload,
} from "./user.types";

export const userSet = (user: User | null): UserSetAction => {
    return {
        type: USER_SET,
        payload: user,
    };
};

export const userLogin = (userInfo: UserLoginPayload): UserLoginAction => {
    return {
        type: USER_LOGIN,
        payload: userInfo,
    };
};

export const userLogout = (payload: UserLogoutPayload): UserLogoutAction => {
    return {
        type: USER_LOGOUT,
        payload,
    };
};
