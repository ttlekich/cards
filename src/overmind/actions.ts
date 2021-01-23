import { Action, AsyncAction } from "overmind";
import { User, UserLoginInput } from "../entities/user";
import {
    DRAW_CARD,
    Game,
    GameFinished,
    GamePlaying,
    Move,
    PLAY_CARD,
    SET_SUIT,
    SKIP_TURN,
} from "../entities/game";
import * as Crazy8s from "../crazy-eights/game";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { Card, Suit } from "../crazy-eights/deck";
import * as E from "fp-ts/lib/Either";
import { cookies } from "./effects";

export const registerUser: Action<UserLoginInput, Promise<void>> = async (
    { state, effects },
    { email, password }
) => {
    await effects.api.registerUser({ email, password });
};

export const setUser: Action<
    firebase.auth.UserCredential,
    Promise<void>
> = async ({ state, effects }, token) => {
    const user = User.decode(token.user);
    if (E.isLeft(user)) {
        return undefined;
    }
    cookies.saveUser(user.right);
    state.user = user.right;
};

export const logoutUser: Action<void, void> = ({ state, effects }) => {
    state.user = undefined;
    state.game = undefined;
    effects.api.logoutUser();
};

export const startGame: Action<void, void> = ({ effects, state }) => {
    if (state.game && state.game.mode === NOT_PLAYING) {
        let game: GamePlaying | GameFinished = Crazy8s.initialize(8)(
            state.game
        );
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};

export const updateGame: Action<Game, void> = ({ state }, game) => {
    state.game = game;
};

export const joinGame: AsyncAction<string | undefined, void> = async (
    { effects, state },
    name
) => {
    if (state.user && name) {
        await effects.api.joinGame(name, state.user);
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
        let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};

export const skipTurn: Action<void, void> = ({ state, effects }) => {
    if (state.game && state.game.mode === PLAYING && state.user) {
        let move: Move = {
            type: SKIP_TURN,
        };
        let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};

export const playCard: Action<Card, void> = ({ state, effects }, card) => {
    if (
        state.game &&
        state.game.mode === PLAYING &&
        state.user &&
        Crazy8s.isCardPlayable(state.game, card)
    ) {
        let move: Move = {
            type: PLAY_CARD,
            player: state.user,
            payload: card,
        };
        let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
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
        let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
        game = Crazy8s.update(game);
        effects.api.updateGame(game);
    }
};
