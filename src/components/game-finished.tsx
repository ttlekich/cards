import React from "react";
import { Link } from "react-router-dom";
import { sortByScore } from "../crazy-eights/game";
import { useGame } from "../hooks/useGame";

export const GameFinished = () => {
    const { game } = useGame();
    const sortedPlayerScores = game && sortByScore(game.userGameRecord);
    return (
        <div className="flex flex-col items-center space-y-4">
            <div>Game Over!</div>
            {sortedPlayerScores?.map((userGame) => {
                return (
                    <div key={userGame.userUID}>
                        <span>{userGame.email}</span>
                        <span> </span>
                        <span>{userGame.score}</span>
                    </div>
                );
            })}

            <button className="rounded py-1 px-2 bg-gray-900 hover:bg-gray-700 text-white">
                <Link to="/">Return Home</Link>
            </button>
        </div>
    );
};
