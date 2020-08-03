import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Auth } from "../auth/auth";

const AuthButton = () => {
    let history = useHistory();

    return Auth.isAuthenticated ? (
        <div
            onClick={() => {
                Auth.signout(() => history.push("/login"));
                console.log(Auth.isAuthenticated);
            }}
        >
            Log Out
        </div>
    ) : (
        <Link to="login">Log In</Link>
    );
};

export default AuthButton;
