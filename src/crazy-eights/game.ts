import {
    CHOOSE_SUIT,
    CLOCKWISE,
    COUNTER_CLOCKWISE,
    DRAW_CARD,
    Game,
    GameHistory,
    GamePlaying,
    GAME_START,
    Move,
    NEXT_ROUND,
    PlayDirection,
    PLAY_CARD,
    REVEALED_CARD,
    REVEAL_CARD,
    REVERSE_DIRECTION,
    SET_SUIT,
    SKIP_TURN,
    TurnOption,
    TurnOptions,
} from "../entities/game";
import { Card, Deck, Hand, newDeck, WILD_CARD } from "./deck";
import * as R from "ramda";
import { shuffle } from "../util/shuffle";
import { PLAYING } from "../entities/game-mode";
import {
    UserGamePlaying,
    UserGameRecord,
    UserGameRecordPlaying,
} from "../entities/user-game";
import { User } from "../entities/user";

export const initialize = (round: number) => (game: Game): GamePlaying => {
    const initialDeck = newDeck();
    const nPlayers = R.keys(game.userGameRecord).length;
    const { hands, rest } = deal(nPlayers)(round)(initialDeck);
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
        round: round,
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

const assignHands = (userGameRecord: UserGameRecord) => (hands: Hand[]) => {
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

export const drawCard = (
    game: GamePlaying,
    player: User | null,
    nCards: number
) => {
    if (player) {
        const { deck } = game;
        const userGame = game.userGameRecord[player.uid];
        const [drawnCards, newDeck] = R.splitAt(nCards, deck);
        const newPlayerHand = [...drawnCards, ...userGame.hand];
        const newUserGame = {
            ...userGame,
            hand: newPlayerHand,
        };
        return {
            ...game,
            deck: newDeck,
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

const countTwos = (history: GameHistory) => {
    const looper = (total: number, history: GameHistory): number => {
        const head = R.head(history);
        if (head && head.type === PLAY_CARD && head.payload.rank === "2") {
            return looper(total + 1, R.tail(history));
        } else {
            return total;
        }
    };
    return looper(0, history);
};

const calculateScores = (game: GamePlaying) => (
    userGameRecord: UserGameRecordPlaying
): UserGameRecordPlaying => {
    const userGames = R.values(userGameRecord);
    const updatedUserGames = userGames.map(calculateScore);
    return R.indexBy(R.prop("userUID"), updatedUserGames);
};

const calculateScore = (userGame: UserGamePlaying) => {
    const { hand } = userGame;
    // eslint-disable-next-line
    const score = hand.reduce((score: number, card: Card) => {
        switch (card.rank) {
            case "2":
                return score + 20;
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
                return score + parseInt(card.rank);
            case "8":
                return score + 50;
            case "9":
            case "10":
                return score + parseInt(card.rank);
            case "J":
            case "Q":
            case "K":
                return score + 10;
            case "A":
                return score + 15;
        }
    }, userGame.score);
    return {
        ...userGame,
        score,
    };
};

export const getTurnOptions = (
    stack: Move[] | null | undefined,
    history: GameHistory
): TurnOption[] => {
    const lastMove = R.head(stack || []);
    console.log("lastMove", lastMove);

    if (lastMove) {
        switch (lastMove.type) {
            case REVEALED_CARD:
            case PLAY_CARD:
                let { suit, rank } = lastMove.payload;
                if (rank === "2") {
                    const twosCount = 2 + 2 * countTwos(history);
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
                            payload: twosCount,
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
                if (rank === "8") {
                    return [
                        {
                            type: CHOOSE_SUIT,
                        },
                    ];
                }
                return [
                    {
                        type: PLAY_CARD,
                        payload: {
                            rank: WILD_CARD,
                            suit: WILD_CARD,
                        },
                    },
                    {
                        type: DRAW_CARD,
                        payload: 1,
                    },
                ];
            case SET_SUIT:
                return [
                    {
                        type: PLAY_CARD,
                        payload: {
                            rank: WILD_CARD,
                            suit: WILD_CARD,
                        },
                    },
                    {
                        type: DRAW_CARD,
                        payload: 1,
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
                    {
                        type: DRAW_CARD,
                        payload: 1,
                    },
                ];
        }
    }

    return [
        {
            type: PLAY_CARD,
            payload: {
                rank: WILD_CARD,
                suit: WILD_CARD,
            },
        },
        {
            type: DRAW_CARD,
            payload: 1,
        },
    ];
};

export const reshuffleDiscard = (game: GamePlaying) => {
    const { deck, discard } = game;
    const newDeck = [...deck, ...shuffle(discard.slice(0, discard.length - 1))];
    const newDiscard = [discard[discard.length - 1]];
    return {
        ...game,
        deck: newDeck,
        discard: newDiscard,
    };
};

export const processMove = (
    game: GamePlaying,
    move: Move
): [GamePlaying, Move | null] => {
    console.log("MOVE: ", move);
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
            const newMove = lastPlayCard
                ? getNewMove(lastPlayCard.payload)
                : null;
            const turnOptions: TurnOptions = newMove
                ? []
                : getTurnOptions(game.stack, game.history);
            return [
                {
                    ...game,
                    turnOptions,
                },
                newMove,
            ];
        case CHOOSE_SUIT:
            return [
                {
                    ...game,
                    turnOptions: getTurnOptions(game.stack, game.history),
                },
                null,
            ];
        case SET_SUIT:
            return [
                {
                    ...game,
                    currentPlayerNumber: getNextPlayerNumber(
                        game.currentPlayerNumber,
                        game.playDirection,
                        game.nPlayers
                    ),
                    turnOptions: getTurnOptions(game.stack, game.history),
                },
                null,
            ];
        case PLAY_CARD:
            const updatedGame = playCard(game, move.player, move.payload);
            const userGame = updatedGame.userGameRecord[move.player.uid];
            console.log("hand: ", userGame.hand);
            if (userGame.hand.length <= 0) {
                return [
                    updatedGame,
                    {
                        type: NEXT_ROUND,
                    },
                ];
            }
            if (move.payload) {
                const newMove = getNewMove(move.payload);
                if (newMove) {
                    return [updatedGame, newMove];
                }
            }
            if (move.payload && move.payload.rank === "8") {
                return [
                    {
                        ...updatedGame,
                        turnOptions: getTurnOptions(game.stack, game.history),
                    },
                    null,
                ];
            }
            return [
                {
                    ...updatedGame,
                    currentPlayerNumber: getNextPlayerNumber(
                        game.currentPlayerNumber,
                        game.playDirection,
                        game.nPlayers
                    ),
                    turnOptions: getTurnOptions(game.stack, game.history),
                },
                null,
            ];
        case DRAW_CARD:
            return [
                drawCard(
                    {
                        ...(game.deck.length <= move.payload
                            ? reshuffleDiscard(game)
                            : game),
                        currentPlayerNumber: getNextPlayerNumber(
                            game.currentPlayerNumber,
                            game.playDirection,
                            game.nPlayers
                        ),
                        turnOptions: getTurnOptions(game.stack, game.history),
                    },
                    move.player,
                    move.payload
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
            return [
                {
                    ...game,
                    currentPlayerNumber,
                    turnOptions: getTurnOptions(game.stack, game.history),
                },
                null,
            ];
        case NEXT_ROUND:
            const updatedUserGameRecord = calculateScores(game)(
                game.userGameRecord
            );
            const nextRoundGame = initialize(game.round - 1)({
                ...game,
                userGameRecord: updatedUserGameRecord,
            });
            return [
                {
                    ...nextRoundGame,
                    currentPlayerNumber: getNextPlayerNumber(
                        game.currentPlayerNumber,
                        game.playDirection,
                        game.nPlayers
                    ),
                    turnOptions: getTurnOptions(game.stack, game.history),
                },
                {
                    type: GAME_START,
                },
            ];
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
