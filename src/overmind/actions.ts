import { Operator } from "overmind";
// import * as E from "fp-ts/lib/Either";
// import { User } from "../entities/user";
import * as o from "./operators";
import { Page } from "../types";

export const showHomePage: Operator = o.setPage(Page.HOME);

export const showLoginPage: Operator = o.setPage(Page.LOGIN);

// export const showUsersPage: AsyncAction = async ({ state, effects }) => {
//     state.isLoadingUsers = true;
//     state.users = E.fold(
//         (e) => [] as User[],
//         (users: User[]) => users
//     )(await effects.api.getUsers());
//     state.isLoadingUsers = false;
// };
