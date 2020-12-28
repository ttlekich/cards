import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { User } from "../entities/user";
import * as E from "fp-ts/lib/Either";
import Cookies from "js-cookie";
import { Game, GameNotPlaying } from "../entities/game";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { nextPlayerNumber } from "../util/player-management";
import { PathReporter } from "io-ts/PathReporter";

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
    onGameSnapshot: (game: Game) => void;
};

export const app = firebase.initializeApp(FIREBASE_CONFIG);
export const auth = firebase.auth();

export const api = (() => {
    let app: firebase.app.App;
    let db: firebase.database.Database;
    let onGameSnapshot: (game: Game) => void;

    return {
        initialize(options: FirebaseInitializeOptions) {
            db = firebase.database(app);
            onGameSnapshot = options.onGameSnapshot;
        },

        getGameRef(id: string) {
            return db.ref(`game/${id}`);
        },

        async deleteGame(id: string) {
            const gameRef = this.getGameRef(id);
            await Promise.all([await gameRef.off(), await gameRef.remove()]);
        },

        async leaveGame(id: string) {
            const gameRef = this.getGameRef(id);
            await gameRef.off();
        },

        async updateGame(game: Game) {
            console.log("game", game);
            const gameRef = this.getGameRef(game.id);
            await gameRef.update(game);
        },

        joinOccupiedGame(game: Game, user: User) {
            switch (game.mode) {
                case PLAYING:
                    return;
                case NOT_PLAYING:
                    const playerNumber = nextPlayerNumber(game.userGameRecord);
                    if (game.userGameRecord[user.uid]) {
                        return;
                    }
                    if (playerNumber) {
                        const newGame: GameNotPlaying = {
                            ...game,
                            userGameRecord: {
                                ...game.userGameRecord,
                                [user.uid]: {
                                    mode: NOT_PLAYING,
                                    userUID: user.uid,
                                    email: user.email,
                                    playerNumber,
                                    score: 0,
                                },
                            },
                        };
                        this.updateGame(newGame);
                        return;
                    } else {
                        return;
                    }
            }
        },

        joinEmptyGame(id: string, user: User) {
            const game: GameNotPlaying = {
                mode: NOT_PLAYING,
                id,
                userGameRecord: {
                    [user.uid]: {
                        mode: NOT_PLAYING,
                        userUID: user.uid,
                        email: user.email,
                        playerNumber: 1,
                        score: 0,
                    },
                },
            };
            this.updateGame(game);
        },

        subscribe(gameRef: firebase.database.Reference) {
            gameRef.on("value", (snapshot) => {
                const value = snapshot.val();
                const game = Game.decode(value);
                if (!value || E.isLeft(game)) {
                    console.log(PathReporter.report(game));
                    gameRef.off();
                } else {
                    onGameSnapshot(game.right);
                }
            });
        },

        async joinGame(id: string, user: User) {
            const gameRef = this.getGameRef(id);
            const value = await gameRef.once("value");
            if (value.val()) {
                const game = Game.decode(value.val());
                if (E.isLeft(game)) {
                    console.error("INVALID GAME STATE");
                    return;
                }
                this.joinOccupiedGame(game.right, user);
            } else {
                this.joinEmptyGame(id, user);
            }
            this.subscribe(gameRef);
        },

        async logoutUser() {
            cookies.removeUser();
            await auth.signOut();
        },

        async registerUser({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) {
            const token = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            console.log(token);
        },
    };
})();
