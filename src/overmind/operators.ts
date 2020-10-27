import { mutate, Operator } from "overmind";
import { DocumentSnapshot } from "../types";
import { User } from "../entities/user";
import { Game } from "../entities/game";
import * as E from "fp-ts/lib/Either";

export const setUser: <T>(user: User) => Operator<T> = (user) =>
    mutate(function setUser({ state }) {
        state.user = user;
    });

export const updateGame: (
    snapshot: DocumentSnapshot
) => Operator<DocumentSnapshot, void> = (snapshot) => {
    const game = Game.decode(snapshot.data());
    if (E.isLeft(game)) {
        return mutate(function updateGame() {});
    }
    return mutate(function updateGame({ state }) {
        state.game = game.right;
    });
};
