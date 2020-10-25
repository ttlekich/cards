export const HOME = "";
export const LOGIN = "login";
export const GAME = "game";

export type IParams = {
    [param: string]: string;
} | void;

export type DocumentData = firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
>;

export type DocumentSnapshot = firebase.firestore.DocumentSnapshot<
    firebase.firestore.DocumentData
>;
