import React from "react";
import { useOvermind } from "../overmind";
import styled from "styled-components";
import * as R from "ramda";
import { PLAYING } from "../entities/game-mode";

const PlayerCount = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const GameDevTools = () => {
    const { state } = useOvermind();
    return (
        <>
            {state.game ? (
                <div>Playing? {String(state.game.mode === PLAYING)}</div>
            ) : null}
            {state.game ? (
                <PlayerCount>
                    Player Count: {R.keys(state.game.userGameRecord).length}
                </PlayerCount>
            ) : (
                <span>Loading...</span>
            )}
        </>
    );
};
