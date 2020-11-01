import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { User } from "../entities/user";
import * as E from "fp-ts/lib/Either";
import * as R from "ramda";
import Cookies from "js-cookie";
import { DocumentSnapshot } from "../types";
import { Game } from "../entities/game";
import { setUserIsReady } from "./actions";
import { State } from "fp-ts/lib/State";
import userEvent from "@testing-library/user-event";
import { UserGame } from "../entities/user-game";
import { nextPlayerNumber } from "../util/player-management";

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
            Cookies.set(CARDS_USER, JSON.stringify({ email: user.email }), {
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
    let db: firebase.firestore.Firestore;
    let auth: firebase.auth.Auth;
    let unsubscribe: () => void = () => {};
    let gamesCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
    let onGameSnapshot: (snapshot: DocumentSnapshot) => void;

    return {
        initialize(options: FirebaseInitializeOptions) {
            app = firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.firestore();
            auth = firebase.auth();
            gamesCollection = db.collection("game");
            onGameSnapshot = options.onGameSnapshot;
        },

        async leaveGame(id: string, user: User | undefined) {
            const gameRef = gamesCollection.doc(id);
            const gameDoc = await gameRef.get();
            if (gameDoc.exists && user) {
                const gameStateEither = Game.decode(gameDoc.data());
                if (E.isLeft(gameStateEither)) {
                    console.error("Invalid Game State");
                } else {
                    const gameState = gameStateEither.right;
                    const {
                        [user.email]: a,
                        ...rest
                    } = gameState.userGameRecord;
                    await gameRef.set({
                        ...gameState,
                        userGameRecord: rest,
                    });
                }
            }
            unsubscribe();
        },

        async setUserIsReady(game: Game, user: User) {
            const gameRef = gamesCollection.doc(game.id);
            const gameDoc = await gameRef.get();
            if (gameDoc.exists && user) {
                const gameStateEither = Game.decode(gameDoc.data());
                if (E.isLeft(gameStateEither)) {
                    console.error("Invalid Game State");
                } else {
                    const gameState = gameStateEither.right;
                    const existingUserGame =
                        gameState.userGameRecord[user.email];
                    if (!existingUserGame) {
                        console.error("UserGame does not exisit for user.");
                    } else {
                        const newUserGame = {
                            ...existingUserGame,
                            isReady: true,
                        };
                        const newGameState: Game = {
                            ...gameState,
                            userGameRecord: {
                                ...gameState.userGameRecord,
                                [user.email]: newUserGame,
                            },
                        };
                        await gameRef.set(newGameState);
                    }
                }
            }
        },

        async joinGame(id: string, user: User) {
            if (gamesCollection) {
                const gameRef = gamesCollection.doc(id);
                const gameDoc = await gameRef.get();
                const userGame: UserGame = {
                    email: user.email,
                    hand: [],
                    isReady: false,
                    playerNumber: 1,
                };
                if (gameDoc.exists) {
                    const gameStateEither = Game.decode(gameDoc.data());
                    if (E.isLeft(gameStateEither)) {
                        console.error("Invalid Game State");
                    } else {
                        const gameState = gameStateEither.right;
                        if (user.email in gameState.userGameRecord) {
                            console.log("already in game");
                        } else {
                            const playerNumber = nextPlayerNumber(
                                gameState.userGameRecord
                            );
                            if (!playerNumber) {
                                console.error("Game is full");
                                return null;
                            }
                            const updatedGameState: Game = {
                                ...gameState,
                                userGameRecord: {
                                    ...gameState.userGameRecord,
                                    [`${user.email}`]: {
                                        ...userGame,
                                        playerNumber,
                                    },
                                },
                            };
                            await gameRef.set(updatedGameState);
                        }
                    }
                } else {
                    const newGame: Game = {
                        id: gameDoc.id,
                        deck: [],
                        userGameRecord: {
                            [`${user.email}`]: userGame,
                        },
                    };
                    await gameRef.set(newGame);
                }
                unsubscribe = gameRef.onSnapshot(onGameSnapshot, (error) => {
                    console.error(`Invalid Game Snapshot ${error}`);
                });
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
