import React, { useState, useContext, useReducer, useEffect } from "react";
import firebase from "../config/firebase";
import { useMutation } from "react-query";
import { User } from "../entities/user";
import Cookies from "js-cookie";
import * as E from "fp-ts/lib/Either";

interface State {
    user: firebase.User | null;
}

interface Action {
    type: typeof USER_SET;
    payload: State;
}

const USER_SET = "USER_SET";

export const UserContext = React.createContext<State>({
    user: null,
});

export const useRegisterUser = () => {
    const registerUser = useMutation(
        async ({ email, password }: { email: string; password: string }) => {
            try {
                const token = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                return token;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    );

    return registerUser;
};

export const useLoginUser = () => {
    const registerUser = useMutation(
        async ({ email, password }: { email: string; password: string }) => {
            try {
                const token: firebase.auth.UserCredential = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                const user = User.decode(token.user);
                if (!E.isLeft(user)) {
                    Cookies.set("CARD_USR", JSON.stringify(user.right));
                }
                return token;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    );

    return registerUser;
};

export const useLogoutUser = () => {
    const logoutUser = useMutation(async () => {
        try {
            firebase.auth().signOut();
        } catch (error) {
            throw new Error(error.message);
        }
    });

    return logoutUser;
};

export const useSession = () => {
    const { user } = useContext(UserContext);

    return user;
};

export const useAuth = () => {
    const [user, setUser] = useState(firebase.auth().currentUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged((user) => setUser(user));
        console.log("here");
        setIsLoading(false);
        return () => unsubscribe();
    }, []);

    return { user, isLoading };
};
