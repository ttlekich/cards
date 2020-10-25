import { User } from "../entities/user";
import { Game } from "../entities/game";
import { HOME } from "../types";

type State = {
    currentPage: string;
    user: User | undefined;
    game: Game | undefined;
};

export const state: State = {
    currentPage: HOME,
    user: undefined,
    game: undefined,
};
