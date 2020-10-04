import React from "react";
import { Link, useHistory } from "react-router-dom";
import { RootState } from "../redux/root.reducer";
import { connect, ConnectedProps } from "react-redux";
import { UserAction, UserLogoutPayload } from "../redux/user/user.types";
import { Dispatch } from "redux";
import { userLogout } from "../redux/user/user.actions";

const mapState = (state: RootState) => ({ user: state.user });
const mapDispatch = (dispatch: Dispatch<UserAction>) => ({
    userLogout: (payload: UserLogoutPayload) => dispatch(userLogout(payload)),
});
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const AuthButton = (props: Props) => {
    const { user } = props.user;
    const history = useHistory();
    return user ? (
        <div
            onClick={() => {
                props.userLogout({ history });
            }}
        >
            Log Out
        </div>
    ) : (
        <Link to="login">Log In</Link>
    );
};

export default connector(AuthButton);
