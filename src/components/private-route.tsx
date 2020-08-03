import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/user-context";

type Props = {
    children?: React.ReactNode;
    path: string;
    to: string;
};

const PrivateRoute: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const user = useContext(UserContext);
    return (
        <Route
            path={props.path}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: props.to,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
