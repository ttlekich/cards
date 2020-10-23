import { User } from "../entities/user";
import { Page } from "../types";
import { Game } from "../entities/game";

type State = {
    user: User | undefined;
    isLoadingUser: boolean;
    isLoadingUsers: boolean;
    currentPage: Page;
    users: User[];
    game: Game | undefined;
};

export const state: State = {
    currentPage: Page.HOME,
    isLoadingUser: false,
    isLoadingUsers: false,
    user: undefined,
    users: [],
    game: undefined,
};
