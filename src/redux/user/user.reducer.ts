import { USER_SET, User, UserAction } from "./user.types";

interface UserState {
    user: User | null;
}
const INITIAL_STATE: UserState = {
    user: null,
};

const userReducer = (state = INITIAL_STATE, action: UserAction) => {
    switch (action.type) {
        case USER_SET:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
