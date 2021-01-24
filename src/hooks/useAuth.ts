import React, { useState, useContext, useReducer, useEffect } from "react";
import firebase from "../config/firebase";
import { useMutation } from "react-query";

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
                const token = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                return token;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    );

    return registerUser;
};

export const useSession = () => {
    const { user } = useContext(UserContext);

    // const logoutUser = () => {
    //     firebase.auth().signOut();
    // };

    return user;
};

const initialState: State = {
    user: null,
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case USER_SET:
            return action.payload;
        default:
            return state;
    }
};

export const useAuth = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const user = firebase.auth().currentUser;
        dispatch({
            type: USER_SET,
            payload: { user },
        });
    }, []);

    const onAuthChange = (user: firebase.User | null) => {
        dispatch({
            type: USER_SET,
            payload: { user },
        });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(onAuthChange);
        return () => unsubscribe();
    }, []);

    return state.user;
};
