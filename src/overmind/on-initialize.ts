import { OnInitialize } from "overmind";

export const onInitialize: OnInitialize = async ({
    state,
    effects,
    actions,
}) => {
    effects.api.initialize();
    state.user = effects.cookies.loadUser();
    effects.router.initialize({
        "/": actions.showHomePage,
        "/login": actions.showLoginPage,
        // '/users/:id', actions.showUserModal
    });
};
