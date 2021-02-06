import React, { useState, useContext, useReducer, useEffect } from "react";
import firebase from "../config/firebase";
import { LoadingSpinner } from "../components/loading-spinner";

type User = firebase.User | null;

const AuthContext = React.createContext<ReturnType<typeof useProviderAuth>>({
    user: null,
    isLoading: false,
    error: null,
    signIn: (email: string, password: string) => Promise.resolve(),
    signUp: (email: string, password: string) => Promise.resolve(),
    signOut: () => Promise.resolve(),
});

type AuthProviderProps = {
    children: React.ReactNode;
};

const useProviderAuth = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>(firebase.auth().currentUser || null);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            setUser(response.user);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            setUser(response.user);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        try {
            await firebase.auth().signOut();
            setUser(null);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
    };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const auth = useProviderAuth();
    return (
        <AuthContext.Provider value={auth}>
            {auth.isLoading ? (
                <div className="flex items-center h-full">
                    <LoadingSpinner></LoadingSpinner>
                </div>
            ) : auth.error ? (
                <div>Oh no...</div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
