import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { LoginPage } from "./pages/login-page";
import { LobbyPage } from "./pages/lobby-page";
import { GamePage } from "./pages/game-page";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { Redirect, Route } from "react-router";
import { GRAY, OFF_WHITE } from "./styles/colors";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

`;

const Wrapper = styled.div`
    align-items: center;
    background-color: ${OFF_WHITE} 
    color: ${GRAY};
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 1vmin);
    min-height: 100vh;
    text-align: center;
`;

export const App = () => {
    return (
        <Wrapper>
            <GlobalStyle></GlobalStyle>
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginPage></LoginPage>
                    </Route>
                    <PrivateRoute path="/lobby">
                        <LobbyPage></LobbyPage>
                    </PrivateRoute>
                    <PrivateRoute path="/game/:id">
                        <GamePage></GamePage>
                    </PrivateRoute>
                    <PrivateRoute path="/game">
                        <Redirect to="/lobby"></Redirect>
                    </PrivateRoute>
                    <PrivateRoute path="/">
                        <LobbyPage></LobbyPage>
                    </PrivateRoute>
                </Switch>
            </Router>
        </Wrapper>
    );
};
