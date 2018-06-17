import { all, put, take } from "redux-saga/effects";
import { action, ActionType, createStandardAction, getType } from "typesafe-actions";
import {authSagaActions} from "../stores/auth/auth.action";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const login = (user: { username: string; password: string }) => action(LOGIN, user);
export const logoutAction = createStandardAction(LOGOUT)();

export type LoginAction = ActionType<typeof login>;

function* auth() {
  while (true) {
    yield take(getType(logoutAction));
    yield put(authSagaActions.success({isAuthenticated: false}));
  }
}

export default function*() {
  yield all([auth()]);
};
