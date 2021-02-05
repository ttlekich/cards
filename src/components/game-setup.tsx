import React from "react";
import { useGame } from "../hooks/useGame";
import { values } from "ramda";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./loading-spinner";

export const GameSetup = () => {
    const { user } = useAuth();
    const { game, setIsReady, isLoading } = useGame();

    const usernames = game
        ? values(game.userGameRecord).map((userGame) => userGame.email)
        : [];

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-64 h-96 border flex flex-col justify-center items-center gap-4 rounded-lg shadow-md py-5 px-10">
                <h1 className="text-lg font-bold">Users</h1>
                <ul className="flex flex-col justify-left gap-2">
                    {isLoading ? (
                        <LoadingSpinner></LoadingSpinner>
                    ) : (
                        usernames.map((username) => (
                            <li
                                className="flex justify-between w-full gap-2"
                                key={username}
                            >
                                <span>{username}</span>
                                <span>✔️</span>
                                <span>❌</span>
                            </li>
                        ))
                    )}
                </ul>
                <button
                    // onClick={handleStartGame}
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
                >
                    Start Game
                </button>
                <button
                    onClick={() => user && game && setIsReady(game, user)}
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
                >
                    Ready
                </button>
            </div>
        </div>
    );
};
