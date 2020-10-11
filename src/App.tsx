import React, { useEffect } from "react";
// import Login from "./pages/login";
// import Navigation from "./components/navigation";
import styled, { createGlobalStyle } from "styled-components";
// import Lobby from "./pages/lobby";
// import Game from "./pages/game";
// import { User } from "./entities/user";
import { useOvermind } from "./overmind";
import * as E from "fp-ts/lib/Either";
import { Page } from "./types";

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
    const { state, effects } = useOvermind();

    useEffect(() => {
        const fetchUsers = async () => {
            // const users = await effects.api.getUsers();
            // if (E.isRight(users)) {
            //     console.log("users", users.right);
            // }

            const token = await effects.api.loginUser({
                email: "ttlekich@gmail.com",
                password: "",
            });
            if (E.isRight(token)) {
                console.log("token", token.right);
            }
        };
        fetchUsers();
        // const userCookie = Cookies.get("user");
        // if (userCookie) {
        //     // TODO io-ts
        //     const user = JSON.parse(userCookie) as User;
        // }
    }, [effects.api]);

    return (
        <Wrapper>
            <GlobalStyle></GlobalStyle>
            {state.currentPage === Page.HOME ? <h1>Home</h1> : null}
            {state.currentPage === Page.LOGIN ? <h1>Login</h1> : null}
            {/* <Navigation></Navigation> <Switch>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                    <PrivateRoute path="/lobby" to="/login">
                        <Lobby></Lobby>
                    </PrivateRoute>
                    <PrivateRoute path="/game/:gameId" to="/login">
                        <Game></Game>
                    </PrivateRoute>
                    <Route path="/">
                        <Redirect to="/lobby"></Redirect>
                    </Route>
                </Switch> */}
        </Wrapper>
    );
};
