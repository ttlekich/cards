import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Navigation } from "../components/navigation";
import { FINISHED, PLAYING } from "../entities/game-mode";
import { GameProvider, useGame } from "../hooks/useGame";
import { GamePlaying } from "../components/game-playing";
import { GameSetup } from "../components/game-setup";
import { useAuth } from "../hooks/useAuth";
import { GameFinished } from "../components/game-finished";

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
    return (
        <div className="flex flex-col items-center h-full">
            <Navigation></Navigation>
            <GameMode></GameMode>
        </div>
    );
};

const GameMode = () => {
    const { game } = useGame();

    if (game) {
        switch (game.mode) {
            case PLAYING:
                return (
                    <div className="flex items-center justify-center h-full">
                        <GamePlaying></GamePlaying>
                    </div>
                );
            case FINISHED:
                return (
                    <div className="flex items-center justify-center h-full">
                        <GameFinished></GameFinished>
                    </div>
                );
            default:
                return <GameSetup></GameSetup>;
        }
    } else {
        return <GameSetup></GameSetup>;
    }
};
