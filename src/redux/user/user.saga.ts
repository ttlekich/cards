import { take, call, put, all, takeLatest } from "redux-saga/effects";
import { eventChannel, EventChannel } from "redux-saga";
import { auth, createUserDocument } from "../../firebase/config";
import Cookies from "js-cookie";
import {
    USER_LOGIN,
    UserLoginAction,
    UserLoginPayload,
    UserLogoutAction,
    USER_LOGOUT,
} from "./user.types";
import { userSet } from "./user.actions";

export function* watchUserLogin() {
    yield takeLatest(USER_LOGIN, loginUser);
}

function* loginUser(action: UserLoginAction) {
    const { payload } = action;
    const { history } = payload;
    const token: firebase.auth.UserCredential = yield signInWithEmailAndPassword(
        action.payload
    );
    Cookies.set("user", JSON.stringify(token.user), {
        sameSite: "strict",
    });
    history.push("/lobby");
}

const signInWithEmailAndPassword = async (userInfo: UserLoginPayload) => {
    const { email, password } = userInfo;
    return await auth.signInWithEmailAndPassword(email, password);
};

export function* watchUserLogout() {
    yield takeLatest(USER_LOGOUT, logoutUser);
}

const logoutUser = (action: UserLogoutAction) => {
    const { payload } = action;
    const { history } = payload;
    auth.signOut();
    Cookies.remove("user", {
        sameSite: "strict",
    });
    history.push("/login");
};

// export function* watchUserRegister() {}

export function* watchFirebaseAuth() {
    const channel: EventChannel<{ user: firebase.User | null }> = yield call(
        getFirebaseAuthChannel
    );
    const { user }: { user: firebase.User | null } = yield take(channel);
    if (user) {
        const userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = yield call(
            createUserDocument,
            user
        );
        userRef.onSnapshot((snapShot) => {
            put(
                userSet({
                    id: snapShot.id,
                    ...user,
                })
            );
            Cookies.set("user", JSON.stringify(user), {
                sameSite: "strict",
            });
        });
    } else {
        put(userSet(null));
    }
}

function getFirebaseAuthChannel() {
    const authChannel: EventChannel<{
        user: firebase.User | null;
    }> = eventChannel((emit) => {
        const unsubscribe = auth.onAuthStateChanged(
            (user: firebase.User | null) => emit({ user })
        );
        return () => unsubscribe();
    });
    return authChannel;
}

export default function* userSaga() {
    yield all([watchFirebaseAuth(), watchUserLogin(), watchUserLogout()]);
}
