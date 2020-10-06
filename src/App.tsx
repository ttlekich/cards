import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import PrivateRoute from "./components/private-route";
// import Login from "./pages/login";
// import Navigation from "./components/navigation";
import styled, { createGlobalStyle } from "styled-components";
// import Lobby from "./pages/lobby";
// import Cookies from "js-cookie";
// import Game from "./pages/game";
// import { User } from "./entities/user";
import { useOvermind } from "./overmind";
import * as E from "fp-ts/lib/Either";

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
    const { effects } = useOvermind();

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
            <Router>
                <div>{"Hello"}</div>
                {/* <Navigation></Navigation>
                <Switch>
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
            </Router>
        </Wrapper>
    );
};
