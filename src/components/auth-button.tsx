import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { UserContext } from "../context/user-context";

type Props = {
    user: firebase.User;
};

const AuthButton = () => {
    let history = useHistory();
    const user = useContext(UserContext);

    return user ? (
        <div
            onClick={() => {
                auth.signOut();
                history.push("/login");
            }}
        >
            Log Out
        </div>
    ) : (
        <Link to="login">Log In</Link>
    );
};

export default AuthButton;
