import createHistory from "history/createBrowserHistory";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import reducers from "./reducers";

export const history = createHistory();
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    {},
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  )

  return Object.assign(store, {
    close: () => store.dispatch(END),
    runSaga: sagaMiddleware.run
  });
}