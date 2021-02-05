import { createMockStore, MockStore } from '../state/mockStore';
import { RoverSearchState } from '../state/types';

import debouncedThunk from './debouncedThunk';

describe('debouncedThunk', () => {
  let store: MockStore<RoverSearchState>;
  let action: jest.Mock;

  beforeEach(() => {
    store = createMockStore<RoverSearchState>();
    action = jest.fn(() => ({ type: 'TEST_ACTION' }));
  });

  describe('when dispatching multiple actions in quick succession', () => {
    let debounced;

    beforeEach(() => {
      debounced = debouncedThunk(action, 200, { leading: true });
      store.dispatch(debounced());
      store.dispatch(debounced());
      store.dispatch(debounced());
    });

    it('only dispatches one action', () => {
      expect(action).toHaveBeenCalledTimes(1);
    });

    it('has the correct action in the store', () => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
