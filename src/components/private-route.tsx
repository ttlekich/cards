import React from "react";
import { Redirect, Route } from "react-router";
import { useOvermind } from "../overmind";

type Props = {
    children: JSX.Element;
    [x: string]: any;
};

export const PrivateRoute = ({ children, ...rest }: Props) => {
    const { state } = useOvermind();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                state.user ? (
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
