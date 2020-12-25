import React from "react";
import { useHistory } from "react-router";
import { useOvermind } from "../overmind";

// type Props = {
//     fixed: boolean;
// };

export const Navigation: React.FC = () => {
    const history = useHistory();
    const { state, actions } = useOvermind();

    const handleLeaveGame = (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.leaveGame();
        history.push("/lobby");
    };

    const handleSignOut = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        await actions.logoutUser();
        history.push("/login");
    };

    return (
        <>
            <nav>
                <div className="flex flex-wrap justify-between p-2">
                    <div>
                        <h1 className="flex-auto text-xl text-gray-900 font-semibold tracking-widest">
                            Crazy 8s <span className="text-red-500">♥︎</span>{" "}
                            <span className="text-gray-900">♠︎</span>{" "}
                            <span className="text-red-500">♦︎</span>{" "}
                            <span className="text-gray-900">♣︎</span>{" "}
                        </h1>
                    </div>
                    <div className="flex items-baseline">
                        {state.user && (
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
