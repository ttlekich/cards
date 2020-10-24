import { OnInitialize } from "overmind";
import { Page } from "../types";

export const onInitialize: OnInitialize = async ({
    state,
    effects,
    actions,
}) => {
    console.log("ON INITIALIZE");
    effects.api.initialize({
        onGameSnapshot: actions.updateGame,
    });
    state.user = effects.cookies.loadUser();
    effects.router.initialize({
        [`/${Page.HOME}`]: actions.showHomePage,
        [`/${Page.LOGIN}`]: actions.showLoginPage,
        [`/${Page.GAME}/:id`]: actions.showGamePage,
    });
};
