import { APP_LOADED } from "./app.types";

const appLoaded = () => ({
    type: APP_LOADED,
});

export const AppAction = {
    appLoaded,
};

export type AppAction = ReturnType<typeof appLoaded>;
