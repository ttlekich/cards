import React from "react";
import { AuthenticatedApp } from "./authenticated-app";
import { useAuth } from "./hooks/useAuth";
import { UnauthenticatedApp } from "./unauthenticated-app";

export const Home = () => {
    const { user } = useAuth();
    return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};
