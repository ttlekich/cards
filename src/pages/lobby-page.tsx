import React from "react";
// import { NewGameForm } from "../components/new-game-form";
import { withRouter } from "react-router-dom";
import { Navigation } from "../components/navigation";

export const LobbyPage = withRouter((props) => {
    const onSubmit = (gameId: string) => {
        props.history.push(`/game/${gameId}`);
    };
    return (
        <div className="flex flex-col items-center h-full w-full">
            <Navigation></Navigation>
            <div className="container">
                {/* <NewGameForm onSubmit={onSubmit}></NewGameForm> */}
            </div>
        </div>
    );
});
