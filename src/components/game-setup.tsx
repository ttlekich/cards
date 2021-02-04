import React from "react";
import { useGameSelector, useSetIsReady } from "../hooks/useGame";
import { values } from "ramda";
import { useAuth } from "../hooks/useAuth";

export const GameSetup = () => {
    const { user } = useAuth();
    const game = useGameSelector();
    const setIsReady = useSetIsReady();

    const usernames = game
        ? values(game.userGameRecord).map((userGame) => userGame.email)
        : [];

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col justify-center items-center gap-4 rounded shadow-md py-5 px-10">
                <h1 className="text-lg font-bold">Users</h1>
                <ul className="flex flex-col justify-left gap-2">
                    {usernames.map((username) => (
                        <li
                            className="flex justify-between w-full gap-2"
                            key={username}
                        >
                            <span>{username}</span>
                            <span>✔️</span>
                            <span>❌</span>
                        </li>
                    ))}
                </ul>
                <button
                    // onClick={handleStartGame}
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
                >
                    Start Game
                </button>
                <button
                    onClick={() =>
                        user && game && setIsReady.mutate({ user, game })
                    }
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
                >
                    Ready
                </button>
            </div>
        </div>
    );
};
