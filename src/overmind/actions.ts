import { Operator, Action } from "overmind";
import * as o from "./operators";
import { DocumentSnapshot, GAME, HOME, IParams, LOGIN } from "../types";
import { UserLoginInput } from "../entities/user";

export const showHomePage: Operator = o.setPage(HOME);

export const showLoginPage: Operator = o.setPage(LOGIN);

export const showGamePage: Operator<IParams> = o.setPage(GAME);

export const loginUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    const user = await effects.api.loginUser({ email, password });
    state.user = user;
};

export const updateGame: Action<DocumentSnapshot, void> = (_, snapshot) => {
    o.updateGame(snapshot);
};

export const joinGame: Action<string, void> = ({ effects }, name) => {
    effects.api.joinGame(name);
};
