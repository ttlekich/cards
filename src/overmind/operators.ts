import { mutate, Operator } from "overmind";
import { DocumentSnapshot, IParams } from "../types";
import { User } from "../entities/user";
import { Game } from "../entities/game";
import * as E from "fp-ts/lib/Either";

export const setPage: (page: string) => Operator<IParams> = (page) =>
    mutate(function setPage({ state }, params) {
        if (params && "gameId" in params) {
            window.history.pushState({}, "", `/${page}/${params.gameId}`);
            state.currentPage = page;
        } else {
            window.history.pushState({}, "", `/${page}`);
            state.currentPage = page;
        }
    });

export const setUser: <T>(user: User) => Operator<T> = (user) =>
    mutate(function setUser({ state }) {
        state.user = user;
    });

export const updateGame: (
    snapshot: DocumentSnapshot
) => Operator<DocumentSnapshot, void> = (snapshot) => {
    const game = Game.decode(snapshot);
    if (E.isLeft(game)) {
        return mutate(function updateGame() {});
    }
    return mutate(function updateGame({ state }) {
        state.game = game.right;
    });
};
