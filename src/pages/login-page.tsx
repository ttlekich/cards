import React from "react";
import { LoginForm } from "../components/login-form";
import { withRouter } from "react-router-dom";
import { Navigation } from "../components/navigation";

export const LoginPage = withRouter(() => {
    return (
        <div className="h-full w-full">
            <Navigation></Navigation>
            <div className="flex items-center justify-center h-full">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
});
