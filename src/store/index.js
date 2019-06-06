import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import ReactotronConfig from '../../ReactotronConfig';
import Reactotron from 'reactotron-react-native';

import reducers from '../reducers';
import sagas from '../sagas';


const sagaMonitor = Reactotron.createSagaMonitor()

// Create saga middleware
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

/*
|-------------------------------------------------------------------------------
| Collect all middlewares
|-------------------------------------------------------------------------------
|
| NOTE: Redux Logger must be the last middleware in chain, otherwise
| it will log thunk/sagas and promises, not actual actions.
| Source: https://github.com/evgenyrodionov/redux-logger/issues/20
|
|-------------------------------------------------------------------------------
*/
const allMiddlewares = [
  sagaMiddleware,
];

// Create Redux store with all middlewares
const store = ReactotronConfig.createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...allMiddlewares)),
);

// Run all sagas with saga middleware
sagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
