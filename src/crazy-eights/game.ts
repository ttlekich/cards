import {
    CLOCKWISE,
    COUNTER_CLOCKWISE,
    DRAW_CARD,
    GameNotPlaying,
    GamePlaying,
    GAME_START,
    Move,
    PlayDirection,
    PLAY_CARD,
    REVEAL_CARD,
    REVERSE_DIRECTION,
    SKIP_TURN,
} from "../entities/game";
import { Card, Deck, Hand, newDeck } from "./deck";
import * as R from "ramda";
import { shuffle } from "../util/shuffle";
import { PLAYING } from "../entities/game-mode";
import {
    UserGameRecord,
    UserGameRecordNotPlaying,
    UserGameRecordPlaying,
} from "../entities/user-game";
import { User } from "../entities/user";

export const initialize = (game: GameNotPlaying): GamePlaying => {
    const initialDeck = newDeck();
    const nPlayers = R.keys(game.userGameRecord).length;
    const INITIAL_HAND_SIZE = 8;
    const { hands, rest } = deal(nPlayers)(INITIAL_HAND_SIZE)(initialDeck);
    const userGameRecord = assignHands(game.userGameRecord)(hands);
    return {
        ...game,
        nPlayers,
        mode: PLAYING,
        deck: rest,
        discard: [],
        userGameRecord,
        playDirection: COUNTER_CLOCKWISE,
        currentPlayerNumber: 1,
        stack: [
            {
                type: GAME_START,
            },
        ],
        history: null,
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
) => {
    const userIds = R.keys(userGameRecord);
    const userHands = R.zipObj(userIds, hands);
    return userIds.reduce((record: UserGameRecord, userId: string) => {
        const userHand = userHands[userId];
        record[userId] = {
            ...record[userId],
            mode: PLAYING,
            hand: userHand,
        };
        return record;
    }, userGameRecord) as UserGameRecordPlaying;
};

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

export const areCardsEqual = (card1: Card) => (card2: Card) => {
    return card1.suit === card2.suit && card1.rank === card2.rank;
};

export const playCard = (
    game: GamePlaying,
    player: User | null,
    card: Card | null
) => {
    if (player && card) {
        const { discard } = game;
        const newDiscard = [...discard, card];
        const previousUserGame = game.userGameRecord[player.uid];
        const newUserGame = {
            ...previousUserGame,
            hand: R.reject(
                (currentCard: Card) => areCardsEqual(currentCard)(card),
                previousUserGame.hand
            ),
        };
        return {
            ...game,
            discard: newDiscard,
            userGameRecord: {
                ...game.userGameRecord,
                [player.uid]: newUserGame,
            },
            cardLastPlayed: card,
        };
    } else {
        const { deck, discard } = reveal({
            deck: game.deck,
            discard: game.discard,
        });
        return {
            ...game,
            discard,
            deck,
        };
    }
};

export const getNextPlayerNumber = (
    currentPlayerNumber: number,
    playDirection: PlayDirection,
    nPlayers: number
) => {
    switch (playDirection) {
        case CLOCKWISE:
            const temp = currentPlayerNumber - 1;
            if (temp <= 0) {
                return nPlayers;
            } else {
                return temp;
            }
        case COUNTER_CLOCKWISE:
            return (currentPlayerNumber % nPlayers) + 1;
    }
};

export const drawCard = (game: GamePlaying, player: User | null) => {
    if (player) {
        const { deck } = game;
        const userGame = game.userGameRecord[player.uid];
        const lastCard = R.head(deck);
        const newPlayerHand = lastCard
            ? [lastCard, ...userGame.hand]
            : userGame.hand;
        const newUserGame = {
            ...userGame,
            hand: newPlayerHand,
        };
        return {
            ...game,
            deck: R.tail(deck),
            userGameRecord: {
                ...game.userGameRecord,
                [player.uid]: newUserGame,
            },
            cardLastPlayed: null,
        };
    } else {
        return game;
    }
};

export const reversePlayDirection = (playDirection: PlayDirection) => {
    switch (playDirection) {
        case COUNTER_CLOCKWISE:
            return CLOCKWISE;
        case CLOCKWISE:
            return COUNTER_CLOCKWISE;
    }
};

export const update = (game: GamePlaying): GamePlaying => {
    const { stack, history } = game;
    if (stack && stack.length > 0) {
        const headMove = stack[0];
        const rest = R.tail(stack);
        const newHistory = [...(history ? history : []), headMove];
        const [updatedGame, newMove] = processMove(game, headMove);
        console.log(updatedGame);
        console.log(newMove);
        if (newMove) {
            return update({
                ...updatedGame,
                stack: [newMove, ...rest],
                history: newHistory,
            });
        }
        return update({
            ...updatedGame,
            stack: rest,
            history: newHistory,
        });
    }
    return game;
};

export const processMove = (
    game: GamePlaying,
    move: Move
): [GamePlaying, Move | null] => {
    switch (move.type) {
        case GAME_START:
            return [
                game,
                {
                    type: REVEAL_CARD,
                },
            ];
        case REVEAL_CARD:
            return [
                {
                    ...game,
                    ...reveal(game),
                },
                null,
            ];
        case PLAY_CARD:
            const updatedGame = playCard(game, move.player, move.payload);
            if (move.payload) {
                const { rank, suit } = move.payload;
                if (rank === "7") {
                    const newMove = {
                        type: REVERSE_DIRECTION,
                    };
                    return [updatedGame, newMove];
                }
            }
            return [updatedGame, null];
        case DRAW_CARD:
            return [drawCard(game, move.player), null];
        case REVERSE_DIRECTION:
            const playDirection = reversePlayDirection(game.playDirection);
            return [{ ...game, playDirection }, null];
        case SKIP_TURN:
            const currentPlayerNumber = getNextPlayerNumber(
                game.currentPlayerNumber,
                game.playDirection,
                game.nPlayers
            );
            return [{ ...game, currentPlayerNumber }, null];
        default:
            return [game, null];
    }
};

export const move = (game: GamePlaying, move: Move) => {
    return {
        ...game,
        stack: [move, ...(game.stack ? game.stack : [])],
    };
};
