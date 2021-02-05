import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Navigation } from "../components/navigation";
import { PLAYING } from "../entities/game-mode";
import { GameProvider, useGame } from "../hooks/useGame";
import { LoadingSpinner } from "../components/loading-spinner";
import { GamePlaying } from "../components/game-playing";
import { GameSetup } from "../components/game-setup";
import { useAuth } from "../hooks/useAuth";

export const GamePage = () => {
    const history = useHistory();
    const match = useRouteMatch<{ id: string }>({
        path: "/game/:id",
    });
    const gameId = match?.params.id;
    if (!gameId) {
        history.push("/");
        return <></>;
    }
    const { user } = useAuth();
    if (!user) {
        history.push("/");
        return <></>;
    }

    return (
        <GameProvider gameId={gameId} user={user}>
            <Game></Game>
        </GameProvider>
    );
};

const Game = () => {
    const { game, isLoading } = useGame();

    return (
        <div className="flex flex-col items-center h-full">
            <Navigation></Navigation>
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <LoadingSpinner></LoadingSpinner>
                </div>
            ) : game && game.mode === PLAYING ? (
                <GamePlaying></GamePlaying>
            ) : (
                <GameSetup></GameSetup>
            )}
        </div>
    );
};
