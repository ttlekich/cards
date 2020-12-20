import React from "react";
import { PLAYING } from "../entities/game-mode";
import { useOvermind } from "../overmind";

export const GameInfo = () => {
    const { state } = useOvermind();
    const game = state.game;

    return game && game.mode === PLAYING ? (
        <div>
            <div>Round: {game.round}</div>
        </div>
    ) : null;
};
