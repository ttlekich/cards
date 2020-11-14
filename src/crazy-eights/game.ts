import { Game } from "../entities/game";
import { Deck, Hand, newDeck } from "./deck";
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
    const hands = R.splitEvery(nCards, shuffledOldDeck);
    return [hands, newDeck];
};

export const deal = (roundOf: number) => (game: Game): Game => {
    if (game.deck) {
        const nPlayers = R.keys(game.userGameRecord).length;
        const nCards = roundOf;
        const [hands, newDeck] = _deal(game.deck)(nCards)(nPlayers);
        const userIds = R.keys(game.userGameRecord);
        const userHands = R.zipObj(userIds, hands);
        const userGameRecord = R.reduce(
            (userGameRecord, userId) => ({
                ...userGameRecord,
                [userId]: {
                    ...userGameRecord[userId],
                    hand: userHands[userId],
                },
            }),
            game.userGameRecord,
            userIds
        );
        return {
            ...game,
            deck: newDeck,
            userGameRecord,
        };
    }
    return game;
};

export const reveal = (game: Game): Game => {
    const { deck, discard } = game;
    const head = R.head(deck);
    const newDiscard = head ? [head, ...discard] : discard;
    const newDeck = R.tail(deck);
    return {
        ...game,
        deck: newDeck,
        discard: newDiscard,
    };
};
