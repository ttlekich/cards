import { GameNotPlaying, GamePlaying } from "../entities/game";
import { Deck, Hand, newDeck } from "./deck";
import * as R from "ramda";
import { shuffle } from "../util/shuffle";
import { PLAYING } from "../entities/game-mode";
import {
    UserGameRecord,
    UserGameRecordNotPlaying,
    UserGameRecordPlaying,
} from "../entities/user-game";

export const reveal = ({
    deck,
    discard,
}: {
    deck: Deck;
    discard: Deck;
}): { deck: Deck; discard: Deck } => {
    const firstCard = R.head(deck);
    const newDeck = R.tail(deck);
    const newDiscard = firstCard ? [firstCard, ...discard] : discard;
    return {
        deck: newDeck,
        discard: newDiscard,
    };
};

export const initializeGame = (game: GameNotPlaying): GamePlaying => {
    const initialDeck = newDeck();
    const nPlayers = R.keys(game.userGameRecord).length;
    const INITIAL_HAND_SIZE = 8;
    const { hands, rest } = deal(nPlayers)(INITIAL_HAND_SIZE)(initialDeck);
    const { deck, discard } = reveal({ deck: newDeck(), discard: [] });
    return {
        ...game,
        mode: PLAYING,
        deck,
        discard,
    };
};

const deal = (nHands: number) => (nCards: number) => (deck: Deck) => {
    const [oldDeck, newDeck] = R.splitAt(nCards * nHands, deck);
    const shuffledOldDeck = shuffle(oldDeck);
    const hands = R.splitEvery(nCards, shuffledOldDeck);
    return {
        hands: hands,
        rest: newDeck,
    };
};

const assignHands = (userGameRecord: UserGameRecordNotPlaying) => (
    hands: Hand[]
): UserGameRecordPlaying => {
    const userIds = R.keys(userGameRecord);
    const userHands = R.zipObj(userIds, hands);
    const userGameRecord = R.reduce(
        (userGameRecord: UserGameRecord, userId: string) => ({
            ...userGameRecord,
            [userId]: {
                ...userGameRecord[userId],
                hand: userHands[userId],
            },
        }),
        userGameRecord,
        userIds
    );
};

// export const deal = (roundOf: number) => (game: Game): Game => {
//     if (game.deck) {
//         const nPlayers = R.keys(game.userGameRecord).length;
//         const nCards = roundOf;
//         const [hands, newDeck] = _deal(game.deck)(nCards)(nPlayers);
//
//         return {
//             ...game,
//             deck: newDeck,
//             userGameRecord,
//         };
//     }
//     return game;
// };
