import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Navigation } from "../components/navigation";
import { PLAYING } from "../entities/game-mode";
import { GameContext, useJoinGame } from "../hooks/useGame";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/loading-spinner";
import { GamePlaying } from "../components/game-playing";
import { GameSetup } from "../components/game-setup";

export const GamePage = () => {
    const history = useHistory();
    const match = useRouteMatch<{ id: string }>({
        path: "/game/:id",
    });
    const gameId = match?.params.id;
    if (!gameId) {
        history.push("/lobby");
        return <></>;
    }
    const { user } = useAuth();
    if (!user) {
        history.push("/");
        return <></>;
    }

    const { joinGame, game } = useJoinGame(gameId, user);

    return (
        <GameContext.Provider value={{ game }}>
            <div className="flex flex-col items-center h-full">
                <Navigation></Navigation>
                {joinGame.isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                ) : game && game.mode === PLAYING ? (
                    <GamePlaying></GamePlaying>
                ) : (
                    <GameSetup></GameSetup>
                )}
            </div>
        </GameContext.Provider>
    );
};
