import devConfigureStore, {history as devHistory} from './configureStore.dev'
import prodConfigureStore, {history as prodHistory} from './configureStore.prod'
// tslint:disable-next-line:variable-name
let _configureStore
// tslint:disable-next-line:variable-name
let _history
if(process.env.NODE_ENV === 'production') {
  _configureStore = prodConfigureStore;
  _history = prodHistory;
} else {
  _configureStore = devConfigureStore;
  _history = devHistory
}

export const configureStore = _configureStore;
export const history = _history;
export default configureStore;