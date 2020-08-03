import React from "react";
import { Route, Redirect } from "react-router-dom";

type Props = {
    children?: React.ReactNode;
    path: string;
    to: string;
};

const IS_AUTHENTICATED = true;

const PrivateRoute: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <Route
            path={props.path}
            render={({ location }) =>
                IS_AUTHENTICATED ? (
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
