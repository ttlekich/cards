import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import page from "page";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { User, Users } from "../entities/user";
import Cookies from "js-cookie";
import { updateGame } from "./actions";

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
            return O.fromEither(
                E.flatten(
                    pipe(
                        Cookies.get(CARDS_USER),
                        O.fromNullable,
                        O.map(JSON.parse),
                        E.fromOption(() => new Error("No User Found")),
                        E.map((user) =>
                            pipe(
                                User.decode(user),
                                E.bimap(
                                    (err) => new Error(`${err}`),
                                    (user) => {
                                        cookies.saveUser(user);
                                        return user;
                                    }
                                )
                            )
                        )
                    )
                )
            );
        },
        saveUser: (user: User) => {
            Cookies.set(CARDS_USER, JSON.stringify({ email: user.email }), {
                sameSite: "strict",
            });
        },
    };
})();

export const api = (() => {
    let app: O.Option<firebase.app.App> = O.none;
    let db: O.Option<firebase.firestore.Firestore> = O.none;
    let auth: O.Option<firebase.auth.Auth> = O.none;
    let leaveGame: () => void = () => {};

    return {
        initialize() {
            app = O.fromNullable(firebase.initializeApp(FIREBASE_CONFIG));
            db = O.fromNullable(firebase.firestore());
            auth = O.fromNullable(firebase.auth());
        },

        leaveGame,

        joinGame(name: string) {
            pipe(
                db,
                O.map((db) => db.collection("game").doc(name)),
                O.map((doc) => {
                    console.log(doc);
                    leaveGame = doc.onSnapshot(
                        (gameSnapshot) => {
                            console.log(gameSnapshot);
                            // updateGame(gameSnapshot);
                        },
                        (err) => {
                            console.log("error", err);
                        }
                    );
                    return O.none;
                })
            );
        },

        async logoutUser() {
            return await pipe(
                auth,
                E.fromOption<Error>(
                    () => new Error(`Firebase Auth is not Configured.`)
                ),
                TE.fromEither,
                TE.chain((auth) =>
                    TE.tryCatch(
                        () => {
                            Cookies.remove("user", {
                                sameSite: "strict",
                            });
                            return auth.signOut();
                        },
                        (err) => new Error(`${err}`)
                    )
                )
            )();
        },

        async loginUser({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) {
            return E.flatten(
                await pipe(
                    auth,
                    E.fromOption<Error>(
                        () => new Error(`Firebase Auth is not Configured.`)
                    ),
                    TE.fromEither,
                    TE.chain((auth) =>
                        TE.tryCatch(
                            () =>
                                auth.signInWithEmailAndPassword(
                                    email,
                                    password
                                ),
                            (err) => new Error(`${err}`)
                        )
                    ),
                    TE.map((token) => {
                        return pipe(
                            User.decode(token.user),
                            E.bimap(
                                (err) => new Error(`${err}`),
                                (user) => {
                                    cookies.saveUser(user);
                                    return user;
                                }
                            )
                        );
                    })
                )()
            );
        },

        async getUsers(): Promise<E.Either<Error, User[]>> {
            return E.flatten(
                await pipe(
                    db,
                    E.fromOption<Error>(
                        () => new Error(`Firebase App is not Configured.`)
                    ),
                    TE.fromEither,
                    TE.chain((db) =>
                        TE.tryCatch(
                            () => db.collection("user").get(),
                            (err) => new Error(`${err}`)
                        )
                    ),
                    TE.map((snapshot) =>
                        snapshot.docs.map((doc) => doc.data())
                    ),
                    TE.map((rawUsers) => {
                        return pipe(
                            Users.decode(rawUsers),
                            E.bimap(
                                (err) => new Error(`${err}`),
                                (user) => user
                            )
                        );
                    })
                )()
            );
        },
    };
})();
