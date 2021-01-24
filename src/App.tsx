import React from "react";
import { LoginPage } from "./pages/login-page";
import { LobbyPage } from "./pages/lobby-page";
import { GamePage } from "./pages/game-page";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { Redirect, Route } from "react-router";

import { useAuth, UserContext } from "./hooks/useAuth";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export const App = () => {
    const user = useAuth();

    return (
        <div className="flex flex-col bg-gray-50 w-full h-full">
            <UserContext.Provider value={{ user }}>
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <Switch>
                            <Route path="/login">
                                {user ? (
                                    <Redirect to="/lobby"></Redirect>
                                ) : (
                                    <LoginPage></LoginPage>
                                )}
                            </Route>
                            <PrivateRoute path="/lobby">
                                <LobbyPage></LobbyPage>
                            </PrivateRoute>
                            <PrivateRoute path="/game/:id">
                                <GamePage></GamePage>
                            </PrivateRoute>
                            <PrivateRoute path="/">
                                <LobbyPage></LobbyPage>
                            </PrivateRoute>
                        </Switch>
                    </Router>
                </QueryClientProvider>
            </UserContext.Provider>
        </div>
    );
};
