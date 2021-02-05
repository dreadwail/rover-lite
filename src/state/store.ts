import { applyMiddleware, compose as composePlain, createStore, StoreEnhancer } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from './reducer';

interface EnhancedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__(options: object): (...args: any[]) => StoreEnhancer<any>;
}

declare var window: EnhancedWindow;

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const compose = composeWithDevTools ? composeWithDevTools({ serialize: true }) : composePlain;
const enhancer = applyMiddleware(thunkMiddleware);

const rootReducer = createRootReducer();
export default createStore(rootReducer, compose(enhancer));
