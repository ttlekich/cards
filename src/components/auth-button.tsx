import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import Cookies from "js-cookie";
import { RootState } from "../redux/root.reducer";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({ user: state.user });
const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const AuthButton = (props: Props) => {
    const { user } = props.user;
    return user ? (
        <div
            onClick={() => {
                auth.signOut();
                Cookies.remove("user", {
                    sameSite: "strict",
                });
            }}
        >
            Log Out
        </div>
    ) : (
        <Link to="login">Log In</Link>
    );
};

export default connector(AuthButton);
