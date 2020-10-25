import { Action } from "overmind";
import * as o from "./operators";
import { DocumentSnapshot } from "../types";
import { UserLoginInput } from "../entities/user";

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
