import { AnyAction } from 'redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

export type MockStore<T> = MockStoreEnhanced<T, ThunkDispatch<T, {}, AnyAction>>;

export const createMockStore = <T>(initialState?: Partial<T>) => {
  const createStore = configureStore<T, ThunkDispatch<T, {}, AnyAction>>([thunkMiddleware]);
  if (initialState == null) {
    return createStore();
  }
  return createStore(initialState as T);
};
