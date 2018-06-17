import {push} from 'react-router-redux'
import {call, fork, put, take} from 'redux-saga/effects';
import {ActionType, getType} from 'typesafe-actions'
import {loginApi} from '../../api/login'
import {authSagaActions} from '../../stores/auth/auth.action'
import {UnwrapResponseType} from '../../utils/unwrapResponseType';
import {loginAction} from './Login.action'

function* loginSaga() {
  while(true) {
    try {
      const action:ActionType<typeof loginAction> = yield take(getType(loginAction));
      const {username, password} = action.payload;
      const res:UnwrapResponseType<typeof loginApi.login>= yield call(loginApi.login, {username, password});
      const {rtn} = res;
      if(rtn === 0) {
        yield put(authSagaActions.success({isAuthenticated: true, username}));
        yield put(push('/'));
      }
    } catch(e) {
      yield put(authSagaActions.error({message: 'login failed'}));
      throw e;
    }
  }
}

export default function*() {
  yield fork(loginSaga)
}

