import {History} from 'history'
import * as React from "react";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import "./App.scss";

import PrivateRoute from './components/PrivateRoute/PrivateRoute'

import {connectedLoginPage} from './pages/Login/Login'
import MainPage from './pages/Main/Main'

const { Component } = React;

export interface IAppProps {
  history: History
}


class App extends Component<IAppProps> {
  public render() {
    const {history} = this.props;
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={connectedLoginPage} />
          <PrivateRoute path="/" component={MainPage} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
