import React from "react";
import { useOvermind } from "../overmind";
import styled from "styled-components";
import * as R from "ramda";

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
                <div>Playing? {String(state.game.isPlaying)}</div>
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
