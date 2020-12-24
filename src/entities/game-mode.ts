import * as t from "io-ts";

export const PLAYING = "PLAYING" as const;
export const _PLAYING = t.literal(PLAYING);
export const NOT_PLAYING = "NOT_PLAYING" as const;
export const _NOT_PLAYING = t.literal(NOT_PLAYING);
export const FINISHED = "FINISHED" as const;
export const _FINISHED = t.literal(FINISHED);
