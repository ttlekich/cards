import React from "react";
import { LoginPage } from "./pages/login-page";
import { LobbyPage } from "./pages/lobby-page";
import { GamePage } from "./pages/game-page";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { Redirect, Route } from "react-router";

import { useAuth, UserContext } from "./hooks/useAuth";

import { QueryClient, QueryClientProvider } from "react-query";
import { LoadingSpinner } from "./components/loading-spinner";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export const App = () => {
    const { user, isLoading } = useAuth();
    console.log(isLoading);

    return (
        <div className="flex flex-col bg-gray-50 w-full h-full">
            <QueryClientProvider client={queryClient}>
                {user ? (
                    <UserContext.Provider value={{ user }}>
                        <Router>
                            <Switch>
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
                    </UserContext.Provider>
                ) : (
                    <LoginPage></LoginPage>
                )}
            </QueryClientProvider>
        </div>
    );
};

//     {!isLoading ? (
//     ) : (
//         <LoadingSpinner></LoadingSpinner>
//     )}
//             </QueryClientProvider></QueryClientProvider>
// </div>
