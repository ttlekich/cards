import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const Navigation: React.FC = () => {
    const { user, signOut } = useAuth();
    const history = useHistory();

    const handleLeaveGame = (event: React.SyntheticEvent) => {
        event.preventDefault();
        history.push("/lobby");
    };

    const handleSignOut = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        signOut();
    };

    return (
        <>
            <nav className="absolute w-full">
                <div className="flex flex-wrap justify-between p-2 shadow-sm">
                    <div>
                        <h1 className="flex-auto text-xl text-gray-900 font-semibold tracking-widest">
                            <a href="/">Crazy 8s</a>{" "}
                            <span className="text-red-500">♥︎</span>{" "}
                            <span className="text-gray-900">♠︎</span>{" "}
                            <span className="text-red-500">♦︎</span>{" "}
                            <span className="text-gray-900">♣︎</span>{" "}
                        </h1>
                    </div>
                    <div className="flex items-baseline gap-3">
                        {/* {game && (
                            <button
                                className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-sm"
                                onClick={handleLeaveGame}
                            >
                                Leave Game
                            </button>
                        )} */}
                        {user && (
                            <button
                                className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-sm"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};
