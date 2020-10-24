import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useOvermind } from "./overmind";
import { Page } from "./types";
import { LoginPage } from "./pages/login-page";
import { LobbyPage } from "./pages/lobby-page";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

`;

const Wrapper = styled.div`
    align-items: center;
    background-color: #282c34;
    color: white;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 1vmin);
    min-height: 100vh;
    text-align: center;
`;

export const App = () => {
    const { state, actions } = useOvermind();
    if (!state.user && state.currentPage !== Page.LOGIN) {
        actions.showLoginPage();
    }
    if (state.user && state.currentPage === Page.LOGIN) {
        actions.showHomePage();
    }
    return (
        <Wrapper>
            <GlobalStyle></GlobalStyle>
            {state.user ? (
                <>
                    {state.currentPage === Page.HOME ? (
                        <LobbyPage></LobbyPage>
                    ) : null}
                </>
            ) : (
                <>
                    {state.currentPage === Page.LOGIN ? (
                        <LoginPage></LoginPage>
                    ) : null}
                </>
            )}
        </Wrapper>
    );
};
