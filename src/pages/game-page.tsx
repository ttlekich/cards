import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { Player } from "../components/player";
import { newDeck } from "../crazy-eights/deck";
import { useOvermind } from "../overmind";
import * as R from "ramda";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
`;

const PlayerCount = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Players = styled.div`
    display: flex;
    flex-direction: column;
`;

export const GamePage = () => {
    const match = useRouteMatch<{ id: string }>({
        path: "/game/:id",
    });
    const gameId = match?.params.id;
    const { state, actions } = useOvermind();
    const leaveGame = actions.leaveGame;
    const joinGame = actions.joinGame;

    useEffect(() => {
        const deck = newDeck();
        console.log(deck);
        joinGame(gameId);
        return () => {
            leaveGame();
        };
    }, [leaveGame, joinGame, gameId]);

    return (
        <Wrapper>
            <h1>Game</h1>
            {state.game ? (
                <PlayerCount>
                    Player Count: {R.keys(state.game.userGameRecord).length}
                </PlayerCount>
            ) : (
                <span>Loading...</span>
            )}
            {state.game ? (
                <Players>
                    {R.values(
                        R.mapObjIndexed(
                            (userGame, id, _) => (
                                <Player key={id} player={userGame}></Player>
                            ),
                            state.game.userGameRecord
                        )
                    )}
                </Players>
            ) : (
                <span>Loading...</span>
            )}
        </Wrapper>
    );
};
