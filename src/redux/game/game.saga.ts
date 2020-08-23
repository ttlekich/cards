import { all, takeEvery, call, put, take } from "redux-saga/effects";
import { NEW_GAME, NewGameAction, Game } from "./game.types";
import { db } from "../../firebase/config";
import { GameAction } from "./game.actions";
import { isLeft } from "fp-ts/lib/Either";
import { decode } from "punycode";
import { eventChannel } from "redux-saga";

function* watchNewGame() {
    yield takeEvery(NEW_GAME, gameSetup);
}

function* gameSetup(action: NewGameAction) {
    const { payload } = action;
    const { name, history } = payload;
    yield call(createGameDocument, name);
    yield call(subscribeToGameDocument, name);
    history.push(`/game/${name.toLowerCase()}`);
}

export const createGameDocument = (name: string) => {
    db.collection("game").doc(name).set({
        // Game Type
        name: name,
    });
};

function* subscribeToGameDocument(name: string) {
    const channel = yield call(getGameChannel, name);
    const game = yield take(channel);
    const decodedGame = Game.decode(game);
    if (isLeft(decodedGame)) {
    } else {
        yield put(GameAction.gameUpdate({ game: decodedGame.right }));
    }
}

function getGameChannel(name: string) {
    return eventChannel((emit) => {
        const unsubscribe = db
            .collection("game")
            .doc(name)
            .onSnapshot((doc) => {
                emit(doc.data());
            });
        return () => unsubscribe();
    });
}

export default function* userSaga() {
    yield all([watchNewGame()]);
}
