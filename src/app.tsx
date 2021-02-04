import React from "react";
import { Home } from "./home";
import { LoginPage } from "./pages/login-page";
import { LobbyPage } from "./pages/lobby-page";
import { GamePage } from "./pages/game-page";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect, Route } from "react-router";

import { AuthProvider, useAuth } from "./hooks/useAuth";

// import { QueryClient, QueryClientProvider } from "react-query";

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             retry: false,
//         },
//     },
// });

export const App = () => (
    <AuthProvider>
        <Home></Home>
    </AuthProvider>
);
