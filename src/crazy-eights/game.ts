import {
    CLOCKWISE,
    COUNTER_CLOCKWISE,
    DRAW_CARD,
    GameHistory,
    GameNotPlaying,
    GamePlaying,
    GAME_START,
    Move,
    PlayCard,
    PlayDirection,
    PLAY_CARD,
    REVEALED_CARD,
    REVEAL_CARD,
    REVERSE_DIRECTION,
    SKIP_TURN,
    TurnOption,
    TurnOptions,
} from "../entities/game";
import { Card, Deck, Hand, newDeck, WILD_CARD } from "./deck";
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
        history: [],
        turnOptions: [],
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
        const newHistory = [headMove, ...(history ? history : [])];
        const [updatedGame, newMove] = processMove(game, headMove);
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
export const getNthLastPlayCard = (n: number) => (history: GameHistory) => {
    let counter = 1;
    if (history) {
        for (let move of history) {
            if (move.type === PLAY_CARD || move.type === REVEALED_CARD) {
                if (counter === n) {
                    return move;
                }
                counter = counter + 1;
            }
        }
    }
    return undefined;
};

export const getLastPlayCard = getNthLastPlayCard(1);
export const getSecondLastPlayCard = getNthLastPlayCard(2);

export const getNewMove = (card: Card) => {
    const { rank } = card;
    if (rank === "7") {
        return {
            type: REVERSE_DIRECTION,
        };
    }
    return null;
};

export const getLastMove = (history: GameHistory) => {
    return R.head(history);
};

export const getSecondToLastMove = (history: GameHistory) => {
    return R.head(R.tail(history));
};

export const getTurnOptions = (history: GameHistory): TurnOption[] => {
    const lastMove = getLastMove(history);

    if (lastMove) {
        switch (lastMove.type) {
            // TODO these are not being hit correctly
            case REVEALED_CARD:
            case PLAY_CARD:
                let { suit, rank } = lastMove.payload;
                console.log("lastMove", lastMove);
                if (rank === "2") {
                    // TODO Compound 2's
                    return [
                        {
                            type: PLAY_CARD,
                            payload: {
                                rank: "2",
                                suit: suit,
                            },
                        },
                        {
                            type: DRAW_CARD,
                            payload: 2,
                        },
                    ];
                }
                if (rank === "4") {
                    return [
                        {
                            type: PLAY_CARD,
                            payload: {
                                rank: "4",
                                suit: suit,
                            },
                        },
                        {
                            type: SKIP_TURN,
                        },
                    ];
                }
                return [
                    {
                        type: PLAY_CARD,
                        payload: {
                            rank: WILD_CARD,
                            suit: suit,
                        },
                    },
                    {
                        type: PLAY_CARD,
                        payload: {
                            rank: rank,
                            suit: WILD_CARD,
                        },
                    },
                ];
            default:
                return [
                    {
                        type: PLAY_CARD,
                        payload: {
                            rank: WILD_CARD,
                            suit: WILD_CARD,
                        },
                    },
                ];
        }
    }

    // Handle last playcard

    return [
        {
            type: PLAY_CARD,
            payload: {
                rank: WILD_CARD,
                suit: WILD_CARD,
            },
        },
    ];
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
            const { deck, discard } = reveal(game);
            const lastPlayedCard = discard[0];
            return [
                {
                    ...game,
                    deck,
                    discard,
                },
                {
                    type: REVEALED_CARD,
                    payload: lastPlayedCard,
                },
            ];
        case REVEALED_CARD:
            const lastPlayCard = getLastPlayCard([move, ...game.history]);
            console.log("lpc", lastPlayCard);
            const newMove = lastPlayCard
                ? getNewMove(lastPlayCard.payload)
                : null;
            const turnOptions: TurnOptions = newMove
                ? []
                : getTurnOptions(game.history);
            console.log("tu", turnOptions);
            return [
                {
                    ...game,
                    turnOptions,
                },
                newMove,
            ];
        case PLAY_CARD:
            const updatedGame = playCard(game, move.player, move.payload);
            const nextPlayerNumber = getNextPlayerNumber(
                game.currentPlayerNumber,
                game.playDirection,
                game.nPlayers
            );
            if (move.payload) {
                const newMove = getNewMove(move.payload);
                return [updatedGame, newMove];
            }
            return [
                {
                    ...updatedGame,
                    currentPlayerNumber: nextPlayerNumber,
                },
                null,
            ];
        case DRAW_CARD:
            return [
                drawCard(
                    {
                        ...game,
                        currentPlayerNumber: getNextPlayerNumber(
                            game.currentPlayerNumber,
                            game.playDirection,
                            game.nPlayers
                        ),
                    },
                    move.player
                ),
                null,
            ];
        case REVERSE_DIRECTION:
            const playDirection = reversePlayDirection(game.playDirection);
            return [
                {
                    ...game,
                    playDirection,
                    currentPlayerNumber: getNextPlayerNumber(
                        game.currentPlayerNumber,
                        playDirection,
                        game.nPlayers
                    ),
                },
                null,
            ];
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
