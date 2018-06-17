import {LocationChangeAction, RouterAction, routerReducer} from 'react-router-redux'
import {combineReducers} from 'redux'
import { StateType } from 'typesafe-actions';
import {auth, AuthAction} from './auth/auth.reducer'

const rootReducer =  combineReducers({
  auth,
  router: routerReducer
})
type ReactRooterAction = RouterAction | LocationChangeAction;
export type RootState = StateType<typeof rootReducer>
export type RootAction = ReactRooterAction | AuthAction;

export default rootReducer;