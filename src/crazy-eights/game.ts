import {
    CLOCKWISE,
    COUNTER_CLOCKWISE,
    DRAW_CARD,
    GameNotPlaying,
    GamePlaying,
    MoveOptions,
    PlayDirection,
    REVERSE_PLAY_DIRECTION,
    SKIP_NEXT_PLAYER,
} from "../entities/game";
import { Card, Deck, Hand, newDeck } from "./deck";
import * as R from "ramda";
import { shuffle } from "../util/shuffle";
import { PLAYING } from "../entities/game-mode";
import {
    UserGamePlaying,
    UserGameRecord,
    UserGameRecordNotPlaying,
    UserGameRecordPlaying,
} from "../entities/user-game";
import { User } from "../entities/user";
import { alt } from "fp-ts/lib/Option";

export const initialize = (game: GameNotPlaying): GamePlaying => {
    const initialDeck = newDeck();
    const nPlayers = R.keys(game.userGameRecord).length;
    const INITIAL_HAND_SIZE = 8;
    const { hands, rest } = deal(nPlayers)(INITIAL_HAND_SIZE)(initialDeck);
    const { deck, discard } = reveal({ deck: rest, discard: [] });
    const userGameRecord = assignHands(game.userGameRecord)(hands);
    const topCard = R.last(discard) as Card;
    const playDirection = COUNTER_CLOCKWISE;
    const moveOptions = getMoveOptions(1, playDirection, nPlayers, topCard);
    return {
        ...game,
        mode: PLAYING,
        deck,
        discard,
        userGameRecord,
        playDirection: COUNTER_CLOCKWISE,
        currentPlayerNumber: 1,
        moveOptions,
        cardLastPlayed: topCard,
    };
};

const getNextPlayDirection = (playDirection: PlayDirection) => {
    switch (playDirection) {
        case COUNTER_CLOCKWISE:
            return CLOCKWISE;
        case CLOCKWISE:
            return COUNTER_CLOCKWISE;
    }
};

const getMoveOptions = (
    currentPlayerNumber: number,
    playDirection: PlayDirection,
    nPlayers: number,
    card: Card | null | undefined
): MoveOptions => {
    if (card) {
        const { rank } = card;
        if (rank === "2") {
            return {
                playCard: true,
                drawCard: {
                    required: false,
                    nCards: 2,
                },
                alterTurn: null,
            };
        }
        if (rank === "4") {
            const nextPlayDirection = getNextPlayDirection(playDirection);
            const nextPlayerNumber = getNextPlayerNumber(
                currentPlayerNumber,
                playDirection,
                nPlayers
            );
            return {
                playCard: true,
                drawCard: false,
                alterTurn: {
                    required: false,
                    nextPlayDirection,
                    nextPlayerNumber,
                },
            };
        }
        if (rank === "7") {
            const nextPlayDirection = getNextPlayDirection(playDirection);
            const nextPlayerNumber = getNextPlayerNumber(
                currentPlayerNumber,
                playDirection,
                nPlayers
            );
            return {
                playCard: false,
                drawCard: false,
                alterTurn: {
                    required: true,
                    nextPlayDirection,
                    nextPlayerNumber,
                },
            };
        }
    }
    return {
        playCard: true,
        drawCard: true,
        alterTurn: null,
    };
};

export const assignMoveOptions = (game: GamePlaying) => {
    const { playDirection, currentPlayerNumber, cardLastPlayed } = game;
    const nPlayers = R.keys(game.userGameRecord).length;
    const moveOptions = getMoveOptions(
        currentPlayerNumber,
        playDirection,
        nPlayers,
        cardLastPlayed
    );
    return {
        ...game,
        moveOptions,
    };
};

export const enforceMoveOptions = (game: GamePlaying): GamePlaying => {
    const { moveOptions } = game;
    const { playCard, drawCard, alterTurn } = moveOptions;
    if (alterTurn && alterTurn.required) {
        return {
            ...game,
            currentPlayerNumber: alterTurn.nextPlayerNumber
                ? alterTurn.nextPlayerNumber
                : game.currentPlayerNumber,
            playDirection: alterTurn.nextPlayDirection
                ? alterTurn.nextPlayDirection
                : game.playDirection,
            cardLastPlayed: null,
        };
    }
    return game;
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

const areCardsEqual = (card1: Card) => (card2: Card) => {
    return card1.suit === card2.suit && card1.rank === card2.rank;
};

export const canPlayCard = (game: GamePlaying, player: UserGamePlaying) => {
    return game.currentPlayerNumber === player.playerNumber;
};

export const playCard = (game: GamePlaying, player: User, card: Card) => {
    const { discard, playDirection, currentPlayerNumber } = game;
    const nPlayers = R.keys(game.userGameRecord).length;
    const topCard = R.last(discard) as Card;
    const newDiscard = [...discard, card];
    const previousUserGame = game.userGameRecord[player.uid];
    const newUserGame = {
        ...previousUserGame,
        hand: R.reject(
            (currentCard: Card) => areCardsEqual(currentCard)(card),
            previousUserGame.hand
        ),
    };
    const moveOptions = getMoveOptions(
        currentPlayerNumber,
        playDirection,
        nPlayers,
        topCard
    );
    return {
        ...game,
        currentPlayerNumber: getNextPlayerNumber(
            game.currentPlayerNumber,
            game.playDirection,
            R.keys(game.userGameRecord).length
        ),
        discard: newDiscard,
        userGameRecord: {
            ...game.userGameRecord,
            [player.uid]: newUserGame,
        },
        moveOptions,
        cardLastPlayed: card,
    };
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

export const isCardPlayable = (game: GamePlaying, card: Card) => {
    const { discard, cardLastPlayed } = game;
    const topCard = R.last(discard);

    if (cardLastPlayed) {
        const { rank, suit } = cardLastPlayed;
        if (rank === "2") {
            // Can only play a two on a two
            return card.rank === rank;
        }
        if (rank === "4") {
            // TODO
            // Can only play a four on a four
            return card.rank === rank;
        }
        if (rank === "8") {
            // TODO
        }
        return rank === card.rank || suit === card.suit;
    }

    if (topCard) {
        const { rank, suit } = topCard;
        return rank === card.rank || suit === card.suit;
    }

    return false;
};

export const drawCard = (game: GamePlaying, player: User) => {
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
        currentPlayerNumber: getNextPlayerNumber(
            game.currentPlayerNumber,
            game.playDirection,
            R.keys(game.userGameRecord).length
        ),
        userGameRecord: {
            ...game.userGameRecord,
            [player.uid]: newUserGame,
        },
        cardLastPlayed: null,
    };
};
