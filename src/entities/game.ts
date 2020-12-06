import * as t from "io-ts";
import { Card, Deck } from "../crazy-eights/deck";
import { _NOT_PLAYING, _PLAYING } from "./game-mode";
import { UserGameRecordNotPlaying, UserGameRecordPlaying } from "./user-game";

export const CLOCKWISE = "CLOCKWISE" as const;
const _CLOCKWISE = t.literal(CLOCKWISE);
export const COUNTER_CLOCKWISE = "COUNTER_CLOCKWISE" as const;
const _COUNTER_CLOCKWISE = t.literal(COUNTER_CLOCKWISE);

export const PlayDirection = t.union([_CLOCKWISE, _COUNTER_CLOCKWISE]);
export type PlayDirection = t.TypeOf<typeof PlayDirection>;

export const MoveOptions = t.type({
    playCard: t.union([t.boolean, t.undefined]),
    drawCard: t.union([
        t.type({
            required: t.boolean,
            nCards: t.number,
        }),
        t.boolean,
        t.undefined,
    ]),
    alterTurn: t.union([
        t.type({
            required: t.boolean,
            nextPlayerNumber: t.union([t.number, t.undefined]),
            nextPlayDirection: t.union([PlayDirection, t.undefined]),
        }),
        t.null,
        t.undefined,
    ]),
});

export type MoveOptions = t.TypeOf<typeof MoveOptions>;

export const GAME_START = "GAME_START" as const;
export const PLAY_CARD = "PLAY_CARD" as const;
export const DRAW_CARD = "DRAW_CARD" as const;
export const ALTER_TURN = "ALTER_TURN" as const;

export const MoveType = t.union([
    t.literal(GAME_START),
    t.literal(PLAY_CARD),
    t.literal(DRAW_CARD),
    t.literal(ALTER_TURN),
]);
export type MoveType = t.TypeOf<typeof MoveType>;

export const Move = t.type({
    type: MoveType,
    payload: t.union([Card, t.null, MoveOptions]),
});

export const GamePlaying = t.type({
    mode: _PLAYING,
    id: t.string,
    userGameRecord: UserGameRecordPlaying,
    deck: Deck,
    discard: Deck,
    currentPlayerNumber: t.number,
    playDirection: PlayDirection,
    history: t.array(Move),
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

// [{
//     payload: Card
//     type: "PLAY_CARD"
// },
// {
//     payload: Card
//     type: "DRAW_CARD"
// }, {
//     type: "ALTER_TURN",
//     payload:
// }]
