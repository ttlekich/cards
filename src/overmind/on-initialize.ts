import { OnInitialize } from "overmind";
import { GAME, HOME, LOGIN } from "../types";

export const onInitialize: OnInitialize = async ({
    state,
    effects,
    actions,
}) => {
    effects.api.initialize({
        onGameSnapshot: actions.updateGame,
    });
    state.user = effects.cookies.loadUser();
};
