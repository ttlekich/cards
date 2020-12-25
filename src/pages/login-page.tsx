import React from "react";
import { LoginForm } from "../components/login-form";
import { withRouter } from "react-router-dom";
import { Navigation } from "../components/navigation";

export const LoginPage = withRouter((props) => {
    const onSubmit = () => {
        props.history.push("/");
    };
    return (
        <div className="flex flex-col h-full w-full">
            <Navigation></Navigation>
            <div className="container mx-auto flex gap-10">
                <LoginForm onSubmit={onSubmit}></LoginForm>
            </div>
        </div>
    );
});
