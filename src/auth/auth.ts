export const Auth = {
    isAuthenticated: false,
    authenticate(cb: () => void) {
        Auth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: () => void) {
        Auth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};
