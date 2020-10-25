import { OnInitialize } from "overmind";

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
