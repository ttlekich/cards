import { SET_USER, User } from "./user.types";
import { UserAction } from "./user.actions";

interface UserState {
    user: User | null;
}
const INITIAL_STATE: UserState = {
    user: null,
};

const userReducer = (state = INITIAL_STATE, action: UserAction) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
