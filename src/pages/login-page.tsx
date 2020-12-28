import React from "react";
import { LoginForm } from "../components/login-form";
import { withRouter } from "react-router-dom";
import { Navigation } from "../components/navigation";

export const LoginPage = withRouter(() => {
    return (
        <div className="flex flex-col items-center h-full w-full">
            <Navigation></Navigation>
            <div className="container">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
});
