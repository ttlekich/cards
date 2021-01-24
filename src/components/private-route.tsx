import React from "react";
import { Redirect, Route } from "react-router";
import { useSession } from "../hooks/useAuth";

type Props = {
    children: JSX.Element;
    [x: string]: any;
};

export const PrivateRoute = ({ children, ...rest }: Props) => {
    const user = useSession();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
