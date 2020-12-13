import * as t from "io-ts";
import { Card, Deck, Suit, WildCard } from "../crazy-eights/deck";
import { _NOT_PLAYING, _PLAYING } from "./game-mode";
import { User } from "./user";
import { UserGameRecordNotPlaying, UserGameRecordPlaying } from "./user-game";

export const CLOCKWISE = "CLOCKWISE" as const;
export const COUNTER_CLOCKWISE = "COUNTER_CLOCKWISE" as const;

export const PlayDirection = t.union([
    t.literal(CLOCKWISE),
    t.literal(COUNTER_CLOCKWISE),
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type PlayDirection = t.TypeOf<typeof PlayDirection>;

export const REVEAL_CARD = "REVEAL_CARD" as const;
export const REVEALED_CARD = "REVEALED_CARD" as const;
export const GAME_START = "GAME_START" as const;
export const PLAY_CARD = "PLAY_CARD" as const;
export const ROOT_PLAY_CARD = "ROOT_PLAY_CARD" as const;
export const DRAW_CARD = "DRAW_CARD" as const;
export const SKIP_TURN = "SKIP_TURN" as const;
export const REVERSE_DIRECTION = "REVERSE_DIRECTION" as const;
export const CHOOSE_SUIT = "CHOOSE_SUIT" as const;
export const SET_SUIT = "SET_SUIT" as const;

export const MoveType = t.union([
    t.literal(REVEAL_CARD),
    t.literal(REVEALED_CARD),
    t.literal(GAME_START),
    t.literal(PLAY_CARD),
    t.literal(DRAW_CARD),
    t.literal(SKIP_TURN),
    t.literal(REVERSE_DIRECTION),
    t.literal(SET_SUIT),
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type MoveType = t.TypeOf<typeof MoveType>;

export const PlayCard = t.type({
    type: t.literal(PLAY_CARD),
    player: User,
    payload: Card,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type PlayCard = t.TypeOf<typeof PlayCard>;

export const DrawCard = t.type({
    type: t.literal(DRAW_CARD),
    player: User,
    payload: t.number,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type DrawCard = t.TypeOf<typeof DrawCard>;

export const ChooseSuit = t.type({
    type: t.literal(CHOOSE_SUIT),
});

export const SetSuit = t.type({
    type: t.literal(SET_SUIT),
    payload: Suit,
});

export const RevealCard = t.type({
    type: t.literal(REVEAL_CARD),
});

export const RevealedCard = t.type({
    type: t.literal(REVEALED_CARD),
    payload: Card,
});

export const GameStart = t.type({
    type: t.literal(GAME_START),
});

export const SkipTurn = t.type({
    type: t.literal(SKIP_TURN),
});

export const ReverseDirection = t.type({
    type: t.literal(REVERSE_DIRECTION),
});

export const Move = t.union([
    RevealCard,
    RevealedCard,
    PlayCard,
    DrawCard,
    GameStart,
    SkipTurn,
    ReverseDirection,
    SetSuit,
    ChooseSuit,
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Move = t.TypeOf<typeof Move>;

export const DrawCardOption = t.type({
    type: t.literal(DRAW_CARD),
    payload: t.number,
});

export const PlayCardOption = t.type({
    type: t.literal(PLAY_CARD),
    payload: t.union([Card, WildCard]),
});

export const SkipTurnOption = t.type({
    type: t.literal(SKIP_TURN),
});

export const ChooseSuitOption = t.type({
    type: t.literal(CHOOSE_SUIT),
});

export const TurnOption = t.union([
    DrawCardOption,
    PlayCardOption,
    SkipTurnOption,
    ChooseSuitOption,
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type TurnOption = t.TypeOf<typeof TurnOption>;

export const TurnOptions = t.array(TurnOption);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type TurnOptions = t.TypeOf<typeof TurnOptions>;

export const GameHistory = t.array(Move);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type GameHistory = t.TypeOf<typeof GameHistory>;

export const GamePlaying = t.type({
    mode: _PLAYING,
    nPlayers: t.number,
    id: t.string,
    userGameRecord: UserGameRecordPlaying,
    deck: Deck,
    discard: Deck,
    currentPlayerNumber: t.number,
    playDirection: PlayDirection,
    stack: t.union([t.array(Move), t.null, t.undefined]),
    history: GameHistory,
    turnOptions: TurnOptions,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type GamePlaying = t.TypeOf<typeof GamePlaying>;

export const GameNotPlaying = t.type({
    mode: _NOT_PLAYING,
    id: t.string,
    userGameRecord: UserGameRecordNotPlaying,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type GameNotPlaying = t.TypeOf<typeof GameNotPlaying>;

export const Game = t.union([GamePlaying, GameNotPlaying]);

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Game = t.TypeOf<typeof Game>;
