import { Action } from "overmind";
import { UserLoginInput } from "../entities/user";
import {
    DRAW_CARD,
    Game,
    GamePlaying,
    Move,
    PLAY_CARD,
    SET_SUIT,
    SKIP_TURN,
} from "../entities/game";
import * as Crazy8s from "../crazy-eights/game";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { Card, Suit } from "../crazy-eights/deck";

export const registerUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    await effects.api.registerUser({ email, password });
};

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
        game = Crazy8s.update(game);
        console.log("startGame", game);
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

export const chooseSuit: Action<Suit, void> = ({ state, effects }, suit) => {
    if (state.game && state.game.mode === PLAYING && state.user) {
        let move: Move = {
            type: SET_SUIT,
            payload: suit,
        };
        let game: GamePlaying = Crazy8s.move(state.game, move);
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};

export const skipTurn: Action<void, void> = ({ state, effects }) => {
    if (state.game && state.game.mode === PLAYING && state.user) {
        let move: Move = {
            type: SKIP_TURN,
        };
        let game: GamePlaying = Crazy8s.move(state.game, move);
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};

export const playCard: Action<Card, void> = ({ state, effects }, card) => {
    if (
        state.game &&
        state.game.mode === PLAYING &&
        state.user
        // && Crazy8s.isCardPlayable(state.game, card)
    ) {
        let move: Move = {
            type: PLAY_CARD,
            player: state.user,
            payload: card,
        };
        let game: GamePlaying = Crazy8s.move(state.game, move);
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};

export const drawCard: Action<number, void> = ({ state, effects }, nCards) => {
    if (state.game && state.game.mode === PLAYING && state.user) {
        let move: Move = {
            type: DRAW_CARD,
            payload: nCards,
            player: state.user,
        };
        let game: GamePlaying = Crazy8s.move(state.game, move);
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};
