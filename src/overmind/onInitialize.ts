import { OnInitialize } from "overmind";
import { state } from "./state";
import { cookies } from "./effects";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { User } from "../entities/user";
import * as E from "fp-ts/lib/Either";

export const onInitialize: OnInitialize = async ({ effects, actions }) => {
    effects.api.initialize();
    state.user = pipe(
        cookies.loadUser(),
        User.decode,
        E.fold(
            (e) => O.none,
            (user: User) => O.some(user)
        )
    );
    effects.router.initialize({
        "/": actions.showHomePage,
        "/login": actions.showLoginPage,
        // '/users': actions.showUsersPage,
        // '/users/:id', actions.showUserModal
    });
};
