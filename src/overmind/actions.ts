import { Operator, Action } from "overmind";
import * as o from "./operators";
import { Page } from "../types";
import { UserLoginInput } from "../entities/user";
import { Game } from "../entities/game";

export const showHomePage: Operator = o.setPage(Page.HOME);

export const showLoginPage: Operator = o.setPage(Page.LOGIN);

export const loginUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    const user = await effects.api.loginUser({ email, password });
    console.log(user);
    state.user = user;
};

export const redirect = (page: Page) => o.setPage(page);

export const updateGame: Action<Game, void> = ({ state }, game: Game) => {
    state.game = game;
};

export const joinGame: Action<string, void> = ({ effects }, name) => {
    effects.api.joinGame(name);
};
