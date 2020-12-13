import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { PlayerHUD } from "../components/player-hud";
import { useOvermind } from "../overmind";
import * as R from "ramda";
import { DrawPile } from "../components/draw-pile";
import { Navigation } from "../components/navigation";

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
    const joinGame = actions.joinGame;

    useEffect(() => {
        joinGame(gameId);
    }, [joinGame, gameId]);

    const players = R.sortBy(
        R.prop("playerNumber"),
        R.values(state.game ? state.game.userGameRecord : {})
    );

    return (
        <Wrapper>
            <Navigation></Navigation>
            <DrawPile></DrawPile>
            {state.game ? (
                <Players>
                    {R.map(
                        (player) => (
                            <PlayerHUD
                                key={player.email}
                                player={player}
                            ></PlayerHUD>
                        ),
                        players
                    )}
                </Players>
            ) : (
                <span>Loading...</span>
            )}
        </Wrapper>
    );
};
