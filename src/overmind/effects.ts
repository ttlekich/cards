import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import page from "page";
import { User } from "../entities/user";
import * as E from "fp-ts/lib/Either";
import Cookies from "js-cookie";

type IParams = {
    [param: string]: string;
} | void;

export const router = {
    initialize(routes: { [url: string]: (params: IParams) => void }) {
        Object.keys(routes).forEach((url) => {
            page(url, ({ params }) => routes[url](params));
        });
        page.start();
    },
    open: (url: string) => page.show(url),
};

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDZbJPyeWwtR4kBpSUrBDOPEx496q8smBc",
    authDomain: "cards-106c5.firebaseapp.com",
    databaseURL: "https://cards-106c5.firebaseio.com",
    projectId: "cards-106c5",
    storageBucket: "cards-106c5.appspot.com",
    messagingSenderId: "276641378807",
    appId: "1:276641378807:web:a362d952f27a201ebf7ef2",
};

export const cookies = (() => {
    const CARDS_USER = "CARDS_USER";
    return {
        loadUser: () => {
            const userCookie = Cookies.get(CARDS_USER);
            const user = User.decode(userCookie);
            if (E.isLeft(user)) {
                return undefined;
            }
            return user.right;
        },
        removeUser: () => {
            Cookies.remove(CARDS_USER, {
                sameSite: "strict",
            });
        },
        saveUser: (user: User) => {
            Cookies.set(CARDS_USER, JSON.stringify({ email: user.email }), {
                sameSite: "strict",
            });
        },
    };
})();

export const api = (() => {
    let app: firebase.app.App;
    let db: firebase.firestore.Firestore;
    let auth: firebase.auth.Auth;
    let leaveGame: () => void = () => {};
    let gamesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

    return {
        initialize() {
            app = firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.firestore();
            auth = firebase.auth();
            gamesRef = db.collection("game");
        },

        leaveGame,

        async joinGame(id: string) {
            if (gamesRef) {
                const gameDoc = gamesRef.doc(id);
                leaveGame = gameDoc.onSnapshot(
                    () => {}, // next
                    () => {} // error
                );
            }
        },

        async logoutUser() {
            if (auth) {
                cookies.removeUser();
                await auth.signOut();
            }
        },

        async loginUser({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) {
            const token = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            const user = User.decode(token.user);
            if (E.isLeft(user)) {
                return undefined;
            }
            cookies.saveUser(user.right);
            return user.right;
        },
    };
})();
