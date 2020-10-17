import React from "react";
import { useOvermind } from "../overmind";
import { Page } from "../types";
import { LobbyPage } from "../pages/lobby-page";

export const AuthenticatedApp = () => {
    const { state, actions } = useOvermind();
    if (state.currentPage === Page.LOGIN) {
        actions.showHomePage();
    }
    return (
        <>{state.currentPage === Page.HOME ? <LobbyPage></LobbyPage> : null}</>
    );
};
