import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/private-route";
import Login from "./pages/login";
import Navigation from "./components/navigation";
import styled, { createGlobalStyle } from "styled-components";

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

const App = () => {
    return (
        <Wrapper>
            <GlobalStyle></GlobalStyle>
            <Router>
                <Navigation></Navigation>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/lobby"></Redirect>
                    </Route>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                    <PrivateRoute path="/lobby" to="/login"></PrivateRoute>
                </Switch>
            </Router>
        </Wrapper>
    );
};

export default App;
