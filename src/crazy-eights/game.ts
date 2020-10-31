import { Game } from "../entities/game";
import { Deck, newDeck } from "./deck";
import * as R from "ramda";
import { shuffle } from "../util/shuffle";

export const initializeDeck = (game: Game): Game => {
    const deck = newDeck();
    return {
        ...game,
        deck,
    };
};

const _deal = (deck: Deck) => (nCards: number) => (
    nPlayers: number
): [Deck[], Deck] => {
    const [oldDeck, newDeck] = R.splitAt(nCards * nPlayers, deck);
    const shuffledOldDeck = shuffle(oldDeck);
    const hands = R.splitEvery(nPlayers, shuffledOldDeck);
    return [hands, newDeck];
};

export const deal = (roundOf: number) => (game: Game): Game => {
    if (!game.deck) {
        const nPlayers = game.users.length;
        const nCards = roundOf;
        const [hands, newDeck] = _deal(game.deck)(nCards)(nPlayers);
        const users = R.zipWith(
            (user, hand) => ({
                ...user,
                hand,
            }),
            game.users,
            hands
        );
        return {
            ...game,
            deck: newDeck,
            users,
        };
    }
    return game;
};
