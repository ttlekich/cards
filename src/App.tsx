import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
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
import Lobby from "./pages/lobby";
import Cookies from "js-cookie";
import Game from "./pages/game";
import { UserAction } from "./redux/user/user.actions";
import { User } from "./redux/user/user.types";
import { RootState } from "./redux/root.reducer";
import { Dispatch } from "redux";
import { AppAction } from "./redux/app/app.actions";

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

const mapState = (state: RootState) => ({ user: state.user });
const mapDispatch = (dispatch: Dispatch<UserAction | AppAction>) => ({
    userSet: (user: User | null) => dispatch(UserAction.userSet(user)),
    appLoaded: () => dispatch(AppAction.appLoaded()),
});
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const App = (props: Props) => {
    const { userSet } = props;

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const user = JSON.parse(userCookie) as User;
            userSet(user);
        }
    }, [userSet]);

    return (
        <Wrapper>
            <GlobalStyle></GlobalStyle>
            <Router>
                <Navigation></Navigation>
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
                </Switch>
            </Router>
        </Wrapper>
    );
};

export default connector(App);
