import { auth } from "../firebase/config";

export const Auth = {
    _isAuthenticated: false,
    isAuthenticated() {
        return this._isAuthenticated;
    },
    listen() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this._isAuthenticated = true;
            } else {
                this._isAuthenticated = false;
            }
        });
    },
    signOut() {
        auth.signOut()
            .then(() => {
                console.log("Sign out succesful.");
            })
            .catch((error) => {
                console.error("Error signing out.", error);
            });
    },
};

Auth.listen();
