import { Operator, Action } from "overmind";
import * as o from "./operators";
import { Page, DocumentSnapshot } from "../types";
import { UserLoginInput } from "../entities/user";

export const showHomePage: Operator = o.setPage(Page.HOME);

export const showLoginPage: Operator = o.setPage(Page.LOGIN);

export const showGamePage: Operator = o.setPage(Page.GAME);

export const loginUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    const user = await effects.api.loginUser({ email, password });
    state.user = user;
};

export const updateGame: Action<DocumentSnapshot, void> = (
    context,
    snapshot
) => {
    o.updateGame(snapshot);
};

export const joinGame: Action<string, void> = ({ effects }, name) => {
    effects.api.joinGame(name);
};
