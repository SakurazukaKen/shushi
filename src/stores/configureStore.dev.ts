import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import logger from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import reducers from "./reducers";

export const history = createHistory();

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history), logger))
  );

  if (module.hot) {
    module.hot.accept("../stores", () => {
      const newRootReducer = require("./reducers");
      store.replaceReducer(newRootReducer);
    });
  }
  return Object.assign(store, {
    close: () => store.dispatch(END),
    runSaga: sagaMiddleware.run
  });
}
