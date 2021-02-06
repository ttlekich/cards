import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";

import { LoginPage } from "./pages/login-page";

export const UnauthenticatedApp = () => {
    return (
        <Router>
            <Route path="/">
                <LoginPage></LoginPage>
            </Route>
        </Router>
    );
};
