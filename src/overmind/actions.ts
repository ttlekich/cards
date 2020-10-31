import { Action } from "overmind";
import * as E from "fp-ts/lib/Either";
import { DocumentSnapshot } from "../types";
import { UserLoginInput } from "../entities/user";
import { Game } from "../entities/game";

export const loginUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    await effects.api.loginUser({ email, password });
    state.user = { email: email };
};

export const updateGame: Action<DocumentSnapshot, void> = (
    { state },
    snapshot
) => {
    const game = Game.decode(snapshot.data());
    if (!E.isLeft(game)) {
        state.game = game.right;
    }
};

export const joinGame: Action<string | undefined, void> = (
    { effects, state },
    name
) => {
    if (state.user && name) {
        effects.api.joinGame(name, state.user);
    }
};

export const leaveGame: Action<void, void> = ({ state, effects }) => {
    if (state.game) {
        effects.api.leaveGame(state.game.id, state.user);
        state.game = undefined;
    }
};
