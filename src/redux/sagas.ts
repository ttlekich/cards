import { all } from "redux-saga/effects";
import userSaga from "./user/user.saga";
import gameSaga from "./game/game.saga";

export default function* rootSaga() {
    yield all([userSaga(), gameSaga()]);
}
