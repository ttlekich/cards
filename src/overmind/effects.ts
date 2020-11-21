import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { User } from "../entities/user";
import * as E from "fp-ts/lib/Either";
import Cookies from "js-cookie";
import { DocumentSnapshot } from "../types";
import { createAssignment } from "typescript";
import { Game, NOT_PLAYING } from "../entities/game";

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
            const user = User.decode(
                userCookie ? JSON.parse(userCookie) : userCookie
            );
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
            Cookies.set(CARDS_USER, JSON.stringify(user), {
                sameSite: "strict",
            });
        },
    };
})();

export type FirebaseInitializeOptions = {
    onGameSnapshot: (snapshot: DocumentSnapshot) => void;
};

export const api = (() => {
    let app: firebase.app.App;
    let db: firebase.database.Database;
    let auth: firebase.auth.Auth;
    let onGameSnapshot: (snapshot: DocumentSnapshot) => void;

    return {
        initialize(options: FirebaseInitializeOptions) {
            app = firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.database(app);
            auth = firebase.auth();
            onGameSnapshot = options.onGameSnapshot;
        },

        getGameRef(id: string) {
            return db.ref(`game/${id}`);
        },

        async deleteGame(id: string) {
            const gameRef = this.getGameRef(id);
            console.log("delted game");
            await gameRef.remove();
        },

        async createGame(game: Game) {
            const gameRef = this.getGameRef(game.id);
            console.log(game);
            await gameRef.update(game);
        },

        async joinGame(id: string, user: User) {
            const gameRef = this.getGameRef(id);
            gameRef.on("value", (snapshot) => {
                const value = snapshot.val();
                if (value) {
                    onGameSnapshot(value);
                } else {
                    const game: Game = {
                        mode: NOT_PLAYING,
                        id,
                        userGameRecord: {
                            [user.uid]: {
                                userUID: user.uid,
                                email: user.email,
                                playerNumber: 1,
                                hand: null,
                            },
                        },
                    };
                    this.createGame(game);
                }
            });
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
