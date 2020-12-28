import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { PlayerHUD } from "../components/player-hud";
import { useOvermind } from "../overmind";
import * as R from "ramda";
import { DrawPile } from "../components/draw-pile";
import { Navigation } from "../components/navigation";
import { LoadingSpinner } from "../components/loading-spinner";

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

    const userGame =
        state.game && state.user
            ? state.game?.userGameRecord[state.user.uid]
            : undefined;

    const nPlayers = R.keys(state.game?.userGameRecord).length;

    return (
        <div className="flex flex-col items-center h-full w-full">
            <Navigation></Navigation>
            <div className="container grid grid-cols-3 grid-rows-3">
                <div className="col-span-3">Other Player</div>
                <div className="transform -rotate-90">Other Player</div>
                <div>
                    <DrawPile></DrawPile>
                </div>
                <div className="transform rotate-90">Other Player</div>
                <div className="col-span-3">
                    {userGame && (
                        <div className="flex justify-center">
                            <PlayerHUD
                                key={userGame.email}
                                player={userGame}
                            ></PlayerHUD>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
