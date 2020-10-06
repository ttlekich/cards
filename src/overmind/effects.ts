import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { User, Users } from "../entities/user";
import Cookies from "js-cookie";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDZbJPyeWwtR4kBpSUrBDOPEx496q8smBc",
    authDomain: "cards-106c5.firebaseapp.com",
    databaseURL: "https://cards-106c5.firebaseio.com",
    projectId: "cards-106c5",
    storageBucket: "cards-106c5.appspot.com",
    messagingSenderId: "276641378807",
    appId: "1:276641378807:web:a362d952f27a201ebf7ef2",
};

// We use IIFE to hide the private "app" variable
export const api = (() => {
    let app: O.Option<firebase.app.App> = O.none;
    let db: O.Option<firebase.firestore.Firestore> = O.none;
    let auth: O.Option<firebase.auth.Auth> = O.none;

    return {
        initialize() {
            app = O.fromNullable(firebase.initializeApp(FIREBASE_CONFIG));
            db = O.fromNullable(firebase.firestore());
            auth = O.fromNullable(firebase.auth());
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
            return await pipe(
                auth,
                E.fromOption<Error>(
                    () => new Error(`Firebase Auth is not Configured.`)
                ),
                TE.fromEither,
                TE.chain((auth) =>
                    TE.tryCatch(
                        () => auth.signInWithEmailAndPassword(email, password),
                        (err) => new Error(`${err}`)
                    )
                ),
                TE.map((token) => {
                    Cookies.set("user", JSON.stringify(token.user), {
                        sameSite: "strict",
                    });
                    return token.user;
                }),
                TE.map((rawUser) => {
                    return pipe(
                        User.decode(rawUser),
                        E.bimap(
                            (err) => new Error(`${err}`),
                            (user) => user
                        )
                    );
                })
            )();
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
