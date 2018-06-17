import {ActionType, getType} from 'typesafe-actions'
import {authSagaActions} from './auth.action'
export type AuthAction = ActionType<typeof authSagaActions>;
const initialState = {
  isAuthenticated: false,
  isFetching: false,
  username: ''
};
export type AuthState = Readonly<typeof initialState>

export const auth = (state:AuthState = initialState, action:AuthAction) => {
  switch(action.type) {
    case getType(authSagaActions.error):{
      return {...state, isFetching: false}
    }
    case getType(authSagaActions.success):{
      const {payload:{isAuthenticated, username}} = action as ActionType<typeof authSagaActions.success>;
      return {...state, isFetching: false, isAuthenticated, username: username || ''}
    }
    case getType(authSagaActions.request): {
      return {...state, isFetching: true}
    }
    default: {
      return state;
    }
  }
}