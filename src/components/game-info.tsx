import React from "react";
import { useOvermind } from "../overmind";

export const GameInfo = () => {
    const { state } = useOvermind();
    const game = state.game;

    return game ? (
        <div>
            <div>Mode: {game.mode}</div>
            {game.mode === "PLAYING" && <div>Round: {game.round}</div>}
        </div>
    ) : (
        <></>
    );
};
