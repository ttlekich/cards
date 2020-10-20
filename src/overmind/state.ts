import * as O from "fp-ts/lib/Option";
import { User } from "../entities/user";
import { Page } from "../types";
import { Game } from "../entities/game";

type State = {
    user: O.Option<User>;
    isLoadingUser: boolean;
    isLoadingUsers: boolean;
    currentPage: Page;
    users: User[];
    game: O.Option<Game>;
};

export const state: State = {
    currentPage: Page.HOME,
    isLoadingUser: false,
    isLoadingUsers: false,
    user: O.none,
    users: [],
    game: O.none,
};
