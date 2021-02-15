import React from "react";
import { Home } from "./home";

import { AuthProvider } from "./hooks/useAuth";

export const App = () => (
    <AuthProvider>
        <Home></Home>
    </AuthProvider>
);
