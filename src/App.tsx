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
import { auth, createUserDocument } from "./firebase/config";
import Lobby from "./pages/lobby";
import Cookies from "js-cookie";
import Game from "./pages/game";
import { UserAction } from "./redux/user/user.actions";
import { User } from "./redux/user/user.types";
import { RootState } from "./redux/root.reducer";
import { Dispatch } from "redux";

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
const mapDispatch = (dispatch: Dispatch<UserAction>) => ({
    setUser: (user: User | null) => dispatch(UserAction.setUser(user)),
});
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const App = (props: Props) => {
    const { setUser } = props;

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const user = JSON.parse(userCookie) as User;
            setUser(user);
        }
    }, [setUser]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userRef = await createUserDocument(user);
                userRef.onSnapshot((snapShot) => {
                    setUser({
                        id: snapShot.id,
                        ...user,
                    });
                    Cookies.set("user", JSON.stringify(user), {
                        sameSite: "strict",
                    });
                });
            } else {
                setUser(user);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [setUser]);

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
