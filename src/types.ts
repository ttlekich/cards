export enum Page {
    HOME = "",
    LOGIN = "login",
    GAME = "game",
}

export type DocumentData = firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
>;

export type DocumentSnapshot = firebase.firestore.DocumentSnapshot<
    firebase.firestore.DocumentData
>;
