import React from "react";
import { NewGameForm } from "../components/new-game-form";
import { withRouter } from "react-router-dom";
import { Navigation } from "../components/navigation";

export const LobbyPage = withRouter((props) => {
    const onSubmit = (gameId: string) => {
        props.history.push(`/game/${gameId}`);
    };
    return (
        <div className="h-full w-full">
            <Navigation></Navigation>
            <div className="flex items-center justify-center h-full">
                <NewGameForm onSubmit={onSubmit}></NewGameForm>
            </div>
        </div>
    );
});
