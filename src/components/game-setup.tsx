import React from "react";
import { useGame } from "../hooks/useGame";
import { values } from "ramda";
import { useAuth } from "../hooks/useAuth";
import { NOT_PLAYING } from "../entities/game-mode";
import * as R from "ramda";

export const GameSetup = () => {
    const { user } = useAuth();
    const { game, setIsReady, isLoading, startGame } = useGame();

    const userGames = game ? values(game.userGameRecord) : [];

    const canStartGame = R.all(
        (userGame) => userGame.mode === NOT_PLAYING && userGame.ready,
        userGames
    );

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col shadow border-gray-200 sm:rounded-log">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {userGames.map((userGame) => (
                                        <tr key={userGame.userUID}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {userGame.email}
                                                        </div>
                                                        {/* <div className="text-sm text-gray-500">
                                                            jane.cooper@example.com
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {userGame.mode ===
                                                    NOT_PLAYING &&
                                                userGame.ready ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Ready
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Not Ready
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-5 flex justify-evenly">
                            <button
                                onClick={() => startGame()}
                                className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
                                disabled={!canStartGame}
                            >
                                <span className="text-sm font-medium text-gray-900">
                                    Start Game
                                </span>
                            </button>
                            <button
                                onClick={() =>
                                    user && game && setIsReady(game, user)
                                }
                                className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
                            >
                                <span className="text-sm font-medium text-gray-900">
                                    Ready
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        //     <div className="w-96 h-96 border flex flex-col justify-center items-center gap-4 rounded-lg shadow-md py-5 px-10">
        //         <div className="w-full flex justify-between">
        //             <button
        //                 onClick={() => startGame()}
        //                 className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
        //             >
        //                 Start Game
        //             </button>
        //             <button
        //                 onClick={() => user && game && setIsReady(game, user)}
        //                 className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
        //             >
        //                 Ready
        //             </button>
        //         </div>
        //         {/* <div className="w-64 h-96 border flex flex-col justify-center items-center gap-4 rounded-lg shadow-md py-5 px-10">
        //         <h1 className="text-lg font-bold">Users</h1>
        //         <ul className="flex flex-col justify-left gap-2">
        //             {usernames.map((username) => (
        //                 <li
        //                     className="flex justify-between w-full gap-2"
        //                     key={username}
        //                 >
        //                     <span>{username}</span>
        //                     <span>✔️</span>
        //                     <span>❌</span>
        //                 </li>
        //             ))}
        //         </ul>
        //         <button
        //             onClick={() => startGame()}
        //             className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
        //         >
        //             Start Game
        //         </button>
        //         <button
        //             onClick={() => user && game && setIsReady(game, user)}
        //             className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
        //         >
        //             Ready
        //         </button>
        //     </div> */}
        //     </div>
        // </div>
    );
};
