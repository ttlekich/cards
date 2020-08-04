import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {
    children?: React.ReactNode;
    path: string;
    to: string;
};

const PrivateRoute: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const user = Cookies.get("user");
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
