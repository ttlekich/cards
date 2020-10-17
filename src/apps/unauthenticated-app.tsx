import React from "react";
import { useOvermind } from "../overmind";
import { LoginPage } from "../pages/login-page";
import { Page } from "../types";

export const UnauthenticatedApp = () => {
    const { state, actions } = useOvermind();
    if (state.currentPage !== Page.LOGIN) {
        actions.showLoginPage();
    }
    return (
        <>{state.currentPage === Page.LOGIN ? <LoginPage></LoginPage> : null}</>
    );
};
