import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";

import { LobbyPage } from "./pages/lobby-page";
import { GamePage } from "./pages/game-page";

export const AuthenticatedApp = () => {
    return (
        <Router>
            <Route path="/game/:id">
                <GamePage></GamePage>
            </Route>
            <Route exact path="/">
                <LobbyPage></LobbyPage>
            </Route>
        </Router>
    );
};
