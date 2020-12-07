import * as t from "io-ts";
import { Card, Deck } from "../crazy-eights/deck";
import { _NOT_PLAYING, _PLAYING } from "./game-mode";
import { User } from "./user";
import { UserGameRecordNotPlaying, UserGameRecordPlaying } from "./user-game";

export const CLOCKWISE = "CLOCKWISE" as const;
export const COUNTER_CLOCKWISE = "COUNTER_CLOCKWISE" as const;

export const PlayDirection = t.union([
    t.literal(CLOCKWISE),
    t.literal(COUNTER_CLOCKWISE),
]);
export type PlayDirection = t.TypeOf<typeof PlayDirection>;

export const REVEAL_CARD = "REVEAL_CARD" as const;
export const GAME_START = "GAME_START" as const;
export const PLAY_CARD = "PLAY_CARD" as const;
export const ROOT_PLAY_CARD = "ROOT_PLAY_CARD" as const;
export const DRAW_CARD = "DRAW_CARD" as const;
export const SKIP_TURN = "SKIP_TURN" as const;
export const REVERSE_DIRECTION = "REVERSE_DIRECTION" as const;

export const MoveType = t.union([
    t.literal(REVEAL_CARD),
    t.literal(GAME_START),
    t.literal(PLAY_CARD),
    t.literal(DRAW_CARD),
    t.literal(SKIP_TURN),
    t.literal(REVERSE_DIRECTION),
]);
export type MoveType = t.TypeOf<typeof MoveType>;

export const PlayCard = t.type({
    type: t.literal(PLAY_CARD),
    player: User,
    payload: Card,
});

export const DrawCard = t.type({
    type: t.literal(DRAW_CARD),
    player: User,
});

export const RevealCard = t.type({
    type: t.literal(REVEAL_CARD),
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
    PlayCard,
    DrawCard,
    GameStart,
    SkipTurn,
    ReverseDirection,
]);

export type Move = t.TypeOf<typeof Move>;

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
    history: t.union([t.array(Move), t.null, t.undefined]),
});

export type GamePlaying = t.TypeOf<typeof GamePlaying>;

export const GameNotPlaying = t.type({
    mode: _NOT_PLAYING,
    id: t.string,
    userGameRecord: UserGameRecordNotPlaying,
});

export type GameNotPlaying = t.TypeOf<typeof GameNotPlaying>;

export const Game = t.union([GamePlaying, GameNotPlaying]);

export type Game = t.TypeOf<typeof Game>;
