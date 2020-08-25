import { USER_SET, User, UserAction } from "./user.types";
import produce, { Draft } from "immer";

interface UserState {
    user: User | null;
}
const INITIAL_STATE: UserState = {
    user: null,
};

const userReducer = produce((draft: Draft<UserState>, action: UserAction) => {
    switch (action.type) {
        case USER_SET:
            draft.user = action.payload;
            return draft;
        default:
            return draft;
    }
}, INITIAL_STATE);

export default userReducer;
