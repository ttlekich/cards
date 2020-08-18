import { USER_SET, User } from "./user.types";
import { UserAction } from "./user.actions";

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
