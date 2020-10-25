import { User } from "../entities/user";
import { Game } from "../entities/game";

type State = {
    user: User | undefined;
    game: Game | undefined;
};

export const state: State = {
    user: undefined,
    game: undefined,
};
