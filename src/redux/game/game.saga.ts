import { all, takeEvery, call, put, take, select } from "redux-saga/effects";
import {
    NEW_GAME,
    NewGameAction,
    Game,
    GAME_UPDATE,
    GameAction,
} from "./game.types";
import { db } from "../../firebase/config";
import { isLeft } from "fp-ts/lib/Either";
import { eventChannel } from "redux-saga";
import { gameStateUpdate } from "./game.actions";
import { gameSelector } from "../selectors";

function* watchGameUpdate() {
    yield takeEvery(GAME_UPDATE, updateGameDocument);
}

function* watchNewGame() {
    yield takeEvery(NEW_GAME, gameSetup);
}

function* gameSetup(action: NewGameAction) {
    const { payload } = action;
    const { name } = payload.game;
    const { history } = payload.meta;
    yield call(updateGameDocument, action);
    yield call(subscribeToGameDocument, name);
    history.push(`/game/${name.toLowerCase()}`);
}

function* updateGameDocument(action: GameAction) {
    const { game } = action.payload;
    const gameState = yield select(gameSelector);
    const name = game.name ? game.name : gameState.name;
    db.collection("game")
        .doc(name)
        .set({
            ...gameState,
            ...action.payload.game,
        });
}

function* subscribeToGameDocument(name: string) {
    const channel = yield call(getGameChannel, name);
    const game = yield take(channel);
    console.log(game);
    const decodedGame = Game.decode(game);
    if (isLeft(decodedGame)) {
        console.log("ERROR");
    } else {
        yield put(gameStateUpdate({ game: decodedGame.right }));
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
    yield all([watchNewGame(), watchGameUpdate()]);
}
