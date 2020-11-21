import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { Player } from "../components/player";
import { useOvermind } from "../overmind";
import * as R from "ramda";
import { Button } from "../components/button";
import { DrawPile } from "../components/draw-pile";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    gap: 1rem;
`;

const Players = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
        joinGame(gameId);
        return () => {
            leaveGame();
        };
    }, [leaveGame, joinGame, gameId]);

    const players = R.sortBy(
        R.prop("playerNumber"),
        R.values(state.game ? state.game.userGameRecord : {})
    );

    const playerOne = R.head(players);

    const handleStartGame = (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.startGame();
    };

    const canStart =
        state.game &&
        state.user &&
        state.user.email === playerOne?.email &&
        !state.game.isPlaying;

    return (
        <Wrapper>
            <div>{"Crazy 8s"}</div>
            <DrawPile></DrawPile>
            {state.game ? (
                <Players>
                    {R.map(
                        (player) => (
                            <Player key={player.email} player={player}></Player>
                        ),
                        players
                    )}
                </Players>
            ) : (
                <span>Loading...</span>
            )}
            {canStart ? (
                <Button primary={false} onClick={handleStartGame}>
                    Start
                </Button>
            ) : null}
        </Wrapper>
    );
};
