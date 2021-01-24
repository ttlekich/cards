// import { Action, AsyncAction } from "overmind";
// import { User, UserLoginInput } from "../entities/user";
// import {
//     DRAW_CARD,
//     Game,
//     GameFinished,
//     GamePlaying,
//     Move,
//     PLAY_CARD,
//     SET_SUIT,
//     SKIP_TURN,
// } from "../entities/game";
// import * as Crazy8s from "../crazy-eights/game";
// import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
// import { Card, Suit } from "../crazy-eights/deck";
// import * as E from "fp-ts/lib/Either";
// import { cookies } from "./effects";

// export const registerUser: Action<UserLoginInput, Promise<void>> = async (
//     { state, effects },
//     { email, password }
// ) => {
//     await effects.api.registerUser({ email, password });
// };

// export const setUser: Action<
//     firebase.auth.UserCredential,
//     Promise<void>
// > = async ({ state, effects }, token) => {
//     const user = User.decode(token.user);
//     if (E.isLeft(user)) {
//         return undefined;
//     }
//     cookies.saveUser(user.right);
//     state.user = user.right;
// };

// export const logoutUser: Action<void, void> = ({ state, effects }) => {
//     state.user = undefined;
//     state.game = undefined;
//     effects.api.logoutUser();
// };

// export const startGame: Action<void, void> = ({ effects, state }) => {
//     if (state.game && state.game.mode === NOT_PLAYING) {
//         let game: GamePlaying | GameFinished = Crazy8s.initialize(8)(
//             state.game
//         );
//         game = Crazy8s.update(game);
//         effects.api.updateGame(game);
//     }
// };

// export const updateGame: Action<Game, void> = ({ state }, game) => {
//     state.game = game;
// };

// export const joinGame: AsyncAction<string | undefined, void> = async (
//     { effects, state },
//     name
// ) => {
//     if (state.user && name) {
//         await effects.api.joinGame(name, state.user);
//     }
// };

// export const deleteGame: Action<void, void> = ({ effects, state }) => {
//     if (state.game) {
//         effects.api.deleteGame(state.game.id);
//     }
// };

// export const leaveGame: Action<void, void> = ({ state, effects }) => {
//     if (state.game && state.user) {
//         effects.api.leaveGame(state.game.id);
//         state.game = undefined;
//     }
// };

// export const chooseSuit: Action<Suit, void> = ({ state, effects }, suit) => {
//     if (state.game && state.game.mode === PLAYING && state.user) {
//         let move: Move = {
//             type: SET_SUIT,
//             payload: suit,
//         };
//         let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
//         game = Crazy8s.update(game);
//         effects.api.updateGame(game);
//     }
// };

// export const skipTurn: Action<void, void> = ({ state, effects }) => {
//     if (state.game && state.game.mode === PLAYING && state.user) {
//         let move: Move = {
//             type: SKIP_TURN,
//         };
//         let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
//         game = Crazy8s.update(game);
//         effects.api.updateGame(game);
//     }
// };

// export const playCard: Action<Card, void> = ({ state, effects }, card) => {
//     if (
//         state.game &&
//         state.game.mode === PLAYING &&
//         state.user &&
//         Crazy8s.isCardPlayable(state.game, card)
//     ) {
//         let move: Move = {
//             type: PLAY_CARD,
//             player: state.user,
//             payload: card,
//         };
//         let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
//         game = Crazy8s.update(game);
//         effects.api.updateGame(game);
//     }
// };

// export const drawCard: Action<number, void> = ({ state, effects }, nCards) => {
//     if (state.game && state.game.mode === PLAYING && state.user) {
//         let move: Move = {
//             type: DRAW_CARD,
//             payload: nCards,
//             player: state.user,
//         };
//         let game: GamePlaying | GameFinished = Crazy8s.move(state.game, move);
//         game = Crazy8s.update(game);
//         effects.api.updateGame(game);
//     }
// };

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";
// import { User } from "../entities/user";
// import * as E from "fp-ts/lib/Either";
// import Cookies from "js-cookie";
// import { Game, GameNotPlaying } from "../entities/game";
// import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
// import { nextPlayerNumber } from "../util/player-management";
// import { PathReporter } from "io-ts/PathReporter";

// const FIREBASE_CONFIG = {
//     apiKey: "AIzaSyDZbJPyeWwtR4kBpSUrBDOPEx496q8smBc",
//     authDomain: "cards-106c5.firebaseapp.com",
//     databaseURL: "https://cards-106c5.firebaseio.com",
//     projectId: "cards-106c5",
//     storageBucket: "cards-106c5.appspot.com",
//     messagingSenderId: "276641378807",
//     appId: "1:276641378807:web:a362d952f27a201ebf7ef2",
// };

// export const cookies = (() => {
//     const CARDS_USER = "CARDS_USER";
//     return {
//         loadUser: () => {
//             const userCookie = Cookies.get(CARDS_USER);
//             const user = User.decode(
//                 userCookie ? JSON.parse(userCookie) : userCookie
//             );
//             if (E.isLeft(user)) {
//                 return undefined;
//             }
//             return user.right;
//         },
//         removeUser: () => {
//             Cookies.remove(CARDS_USER, {
//                 sameSite: "strict",
//             });
//         },
//         saveUser: (user: User) => {
//             Cookies.set(CARDS_USER, JSON.stringify(user), {
//                 sameSite: "strict",
//             });
//         },
//     };
// })();

// export type FirebaseInitializeOptions = {
//     onGameSnapshot: (game: Game) => void;
// };

// export const app = firebase.initializeApp(FIREBASE_CONFIG);
// export const auth = firebase.auth();

// export const api = (() => {
//     let app: firebase.app.App;
//     let db: firebase.database.Database;
//     let onGameSnapshot: (game: Game) => void;

//     return {
//         initialize(options: FirebaseInitializeOptions) {
//             db = firebase.database(app);
//             onGameSnapshot = options.onGameSnapshot;
//         },

//         getGameRef(id: string) {
//             return db.ref(`game/${id}`);
//         },

//         async deleteGame(id: string) {
//             const gameRef = this.getGameRef(id);
//             await Promise.all([await gameRef.off(), await gameRef.remove()]);
//         },

//         async leaveGame(id: string) {
//             const gameRef = this.getGameRef(id);
//             await gameRef.off();
//         },

//         async updateGame(game: Game) {
//             const gameRef = this.getGameRef(game.id);
//             await gameRef.update(game);
//         },

//         joinOccupiedGame(game: Game, user: User) {
//             switch (game.mode) {
//                 case PLAYING:
//                     return;
//                 case NOT_PLAYING:
//                     const playerNumber = nextPlayerNumber(game.userGameRecord);
//                     if (game.userGameRecord[user.uid]) {
//                         return;
//                     }
//                     if (playerNumber) {
//                         const newGame: GameNotPlaying = {
//                             ...game,
//                             userGameRecord: {
//                                 ...game.userGameRecord,
//                                 [user.uid]: {
//                                     mode: NOT_PLAYING,
//                                     userUID: user.uid,
//                                     email: user.email,
//                                     playerNumber,
//                                     score: 0,
//                                 },
//                             },
//                         };
//                         this.updateGame(newGame);
//                         return;
//                     } else {
//                         return;
//                     }
//             }
//         },

//         joinEmptyGame(id: string, user: User) {
//             const game: GameNotPlaying = {
//                 mode: NOT_PLAYING,
//                 id,
//                 userGameRecord: {
//                     [user.uid]: {
//                         mode: NOT_PLAYING,
//                         userUID: user.uid,
//                         email: user.email,
//                         playerNumber: 1,
//                         score: 0,
//                     },
//                 },
//             };
//             this.updateGame(game);
//         },

//         subscribe(gameRef: firebase.database.Reference) {
//             gameRef.on("value", (snapshot) => {
//                 const value = snapshot.val();
//                 const game = Game.decode(value);
//                 if (!value || E.isLeft(game)) {
//                     console.log(PathReporter.report(game));
//                     gameRef.off();
//                 } else {
//                     onGameSnapshot(game.right);
//                 }
//             });
//         },

//         async joinGame(id: string, user: User) {
//             const gameRef = this.getGameRef(id);
//             const value = await gameRef.once("value");
//             if (value.val()) {
//                 const game = Game.decode(value.val());
//                 if (E.isLeft(game)) {
//                     console.error("INVALID GAME STATE");
//                     return;
//                 }
//                 this.joinOccupiedGame(game.right, user);
//             } else {
//                 this.joinEmptyGame(id, user);
//             }
//             this.subscribe(gameRef);
//         },

//         async logoutUser() {
//             cookies.removeUser();
//             await auth.signOut();
//         },

//         async registerUser({
//             email,
//             password,
//         }: {
//             email: string;
//             password: string;
//         }) {
//             const token = await auth.createUserWithEmailAndPassword(
//                 email,
//                 password
//             );
//             return token;
//         },
//     };
// })();
