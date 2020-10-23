import React from "react";
import { useOvermind } from "../overmind";
import { LoginPage } from "../pages/login-page";
import { Page } from "../types";

export const UnauthenticatedApp = () => {
    const { state } = useOvermind();
    console.log("Unauth");
    return (
        <>{state.currentPage === Page.LOGIN ? <LoginPage></LoginPage> : null}</>
    );
};
