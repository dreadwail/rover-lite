jest.mock('redux');

import { combineReducers } from 'redux';

import createRootReducer from './reducer';

describe('create root reducer', () => {
  beforeEach(() => {
    createRootReducer();
  });

  it('contains the correct sub-reducers', () => {
    expect(combineReducers).toHaveBeenCalledWith({
      searchTypes: expect.anything(),
      searchOptions: expect.anything(),
      search: expect.anything(),
      results: expect.anything(),
    });
  });
});
