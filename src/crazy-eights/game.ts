import { Game } from "../entities/game";
import { Deck, newDeck, shuffle } from "./deck";
import * as R from "ramda";

export const initializeDeck = (game: Game) => {
    const deck = newDeck();
    return {
        ...game,
        deck,
    };
};

const _deal = (deck: Deck) => (nCards: number) => (nPlayers: number) => {
    const [oldDeck, newDeck] = R.splitAt(nCards * nPlayers, deck);
    const shuffledOldDeck = shuffle(oldDeck);
    const hands = R.splitEvery(nPlayers, shuffledOldDeck);
};

// const sample = <T>(array: T[]) =>
//     array[Math.floor(Math.random() * array.length)];

export const deal = (game: Game) => (roundOf: number) => {
    if (!game.deck) {
    }
    return game;
};
