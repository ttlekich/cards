import { Operator, Action } from "overmind";
import * as o from "./operators";
import * as O from "fp-ts/lib/Option";
import { Page } from "../types";
import { UserLoginInput } from "../entities/user";

export const showHomePage: Operator = o.setPage(Page.HOME);

export const showLoginPage: Operator = o.setPage(Page.LOGIN);

export const showLobbyPage: Operator = o.setPage(Page.LOBBY);

export const loginUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    state.user = O.fromEither(await effects.api.loginUser({ email, password }));
};

export const redirect = (page: Page) => o.setPage(page);

// export const showUsersPage: AsyncAction = async ({ state, effects }) => {
//     state.isLoadingUsers = true;
//     state.users = E.fold(
//         (e) => [] as User[],
//         (users: User[]) => users
//     )(await effects.api.getUsers());
//     state.isLoadingUsers = false;
// };
