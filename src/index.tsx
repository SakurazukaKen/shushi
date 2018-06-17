import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import rootSaga from './sagas'
import './styles/index.scss'

import { configureStore, history } from "./stores";

const store = configureStore();
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
