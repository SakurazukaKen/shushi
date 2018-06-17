import {all} from 'redux-saga/effects'
import auth from './auth'

import loginPage from '../pages/Login/Login.saga'

export default function* () {
  yield all([
    auth(),
    loginPage()
  ])
}