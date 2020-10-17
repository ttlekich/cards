import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useOvermind } from "./overmind";
import * as O from "fp-ts/lib/Option";
import { UnauthenticatedApp } from "./apps/unauthenticated-app";
import { AuthenticatedApp } from "./apps/authenticated-app";

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
    const { state } = useOvermind();
    console.log(state);
    return (
        <Wrapper>
            <GlobalStyle></GlobalStyle>
            {O.isSome(state.user) ? (
                <AuthenticatedApp />
            ) : (
                <UnauthenticatedApp />
            )}
        </Wrapper>
    );
};
