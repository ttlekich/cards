import { Action } from "overmind";
import { UserLoginInput } from "../entities/user";
import { Game, GamePlaying } from "../entities/game";
import * as Crazy8s from "../crazy-eights/game";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { Card } from "../crazy-eights/deck";

// GAME

export const loginUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    const user = await effects.api.loginUser({ email, password });
    state.user = user;
};

export const logoutUser: Action<void, void> = ({ state, effects }) => {
    state.user = undefined;
    state.game = undefined;
    effects.api.logoutUser();
};

export const startGame: Action<void, void> = ({ effects, state }) => {
    if (state.game && state.game.mode === NOT_PLAYING) {
        let game: GamePlaying = Crazy8s.initialize(state.game);
        game = Crazy8s.updateMoveOptions(game);
        game = Crazy8s.enforceMoveOptions(game);
        effects.api.updateGame(game);
    }
};

export const updateGame: Action<Game, void> = ({ state }, game) => {
    state.game = game;
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
        effects.api.leaveGame(state.game.id);
        state.game = undefined;
    }
};

export const playCard: Action<Card, void> = ({ state, effects }, card) => {
    if (
        state.game &&
        state.game.mode === PLAYING &&
        state.user &&
        Crazy8s.isCardPlayable(state.game, card)
    ) {
        let game: GamePlaying = Crazy8s.playCard(state.game, state.user, card);
        game = Crazy8s.updateMoveOptions(game);
        game = Crazy8s.enforceMoveOptions(game);
        game = Crazy8s.updateCurrentPlayerNumber(game);
        effects.api.updateGame(game);
    }
};

export const drawCard: Action<void, void> = ({ state, effects }) => {
    if (state.game && state.game.mode === PLAYING && state.user) {
        let game: GamePlaying = Crazy8s.drawCard(state.game, state.user);
        game = Crazy8s.updateMoveOptions(game);
        game = Crazy8s.enforceMoveOptions(game);
        game = Crazy8s.updateCurrentPlayerNumber(game);
        effects.api.updateGame(game);
    }
};
