import { take, put, call, apply, delay, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { auth } from "../../firebase/config";

export function* watchUserLogin() {
    yield takeEvery("REFRESH_QUAKES", handleLoadQuakes);
}

export function* handleLoadQuakes() {
    try {
        let resp = yield call(fetchQuakes);

        yield put({
            type: "SET_QUAKES",
            quakes: resp.data.features,
        });
    } catch (e) {
        console.error(e);
    }
}

function getAuthChannel() {
    const authChannel = eventChannel((emit) => {
        const unsubscribe = auth.onAuthStateChanged((user) => emit({ user }));
        return unsubscribe;
    });
    return authChannel;
}

function* watchForFirebaseAuth() {
    // This is where you wait for a callback from firebase
    const channel = yield call(getAuthChannel);
    const result = yield take(channel);
    // result is what you pass to the emit function. In this case, it's an object like { user: { name: 'xyz' } }
}

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel((emit) => {
        const pingHandler = (event) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            emit(event.payload);
        };

        const errorHandler = (errorEvent) => {
            // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason));
        };

        // setup the subscription
        socket.on("ping", pingHandler);
        socket.on("error", errorHandler);

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off("ping", pingHandler);
        };

        return unsubscribe;
    });
}

// reply with a `pong` message by invoking `socket.emit('pong')`
function* pong(socket) {
    yield delay(5000);
    yield apply(socket, socket.emit, ["pong"]); // call `emit` as a method with `socket` as context
}

export function* watchOnPings() {
    const socket = yield call(createWebSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        try {
            // An error from socketChannel will cause the saga jump to the catch block
            const payload = yield take(socketChannel);
            yield put({ type: INCOMING_PONG_PAYLOAD, payload });
            yield fork(pong, socket);
        } catch (err) {
            console.error("socket error:", err);
            // socketChannel is still open in catch block
            // if we want end the socketChannel, we need close it explicitly
            // socketChannel.close()
        }
    }
}

export function* watchUserRegister() {}
