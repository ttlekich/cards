import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Navigation } from "../components/navigation";
import { FINISHED, PLAYING } from "../entities/game-mode";
import { GameProvider, useGame } from "../hooks/useGame";
import { GamePlaying } from "../components/game-playing";
import { GameSetup } from "../components/game-setup";
import { useAuth } from "../hooks/useAuth";
import { GameFinished } from "../components/game-finished";
import { LoadingSpinner } from "../components/loading-spinner";
import { Link } from "react-router-dom";

const DELAY = 5;

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
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), DELAY * 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

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
        return (
            <div className="flex items-center justify-center h-full space-y-8">
                <LoadingSpinner></LoadingSpinner>
                {show && (
                    <button className="rounded py-1 px-2 bg-gray-900 hover:bg-gray-700 text-white">
                        <Link to="/">Return Home</Link>
                    </button>
                )}
            </div>
        );
    }
};
