import { take, call, put, all } from "redux-saga/effects";
import { eventChannel, EventChannel } from "redux-saga";
import { auth, createUserDocument } from "../../firebase/config";
import { UserAction } from "./user.actions";
import Cookies from "js-cookie";

// export function* watchUserLogin() {
//     yield takeEvery("REFRESH_QUAKES", handleLoadQuakes);
// }

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
                UserAction.userSet({
                    id: snapShot.id,
                    ...user,
                })
            );
            Cookies.set("user", JSON.stringify(user), {
                sameSite: "strict",
            });
        });
    } else {
        put(UserAction.userSet(null));
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
    yield all([watchFirebaseAuth()]);
}
