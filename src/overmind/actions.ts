import { Action } from "overmind";
import * as E from "fp-ts/lib/Either";
import { DocumentSnapshot } from "../types";
import { UserLoginInput } from "../entities/user";
import { Game } from "../entities/game";
import { deal, initializeDeck, reveal } from "../crazy-eights/game";

export const loginUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    const user = await effects.api.loginUser({ email, password });
    state.user = user;
};

export const setUserIsReady: Action<void, Promise<void>> = async ({
    state,
    effects,
}) => {
    if (state.game && state.user) {
        // await effects.api.setUserIsReady(state.game, state.user);
    }
};

export const startGame: Action<void, void> = ({ effects, state }) => {
    if (state.game) {
        let game = {
            ...state.game,
            isPlaying: true,
        };
        game = initializeDeck(game);
        game = deal(8)(game);
        game = reveal(game);
        // effects.api.updateGame(game);
    }
};

export const updateGame: Action<DocumentSnapshot, void> = (
    { state },
    snapshot
) => {
    console.log(snapshot);
    const game = Game.decode(snapshot);
    console.log(game);
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

export const deleteGame: Action<void, void> = ({ effects, state }) => {
    if (state.game) {
        effects.api.deleteGame(state.game.id);
    }
};

export const leaveGame: Action<void, void> = ({ state, effects }) => {
    if (state.game && state.user) {
        // effects.api.leaveGame(state.game.id, state.user);
        state.game = undefined;
    }
};
