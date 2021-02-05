import { SearchTypeChangedAction } from '../../domains/search/actions';

import reducer, { FetchSearchOptionsAction } from './reducer';
import { SearchOptions } from './types';

const unhandledAction = ({ type: 'UNHANDLED_TEST_ACTION' } as any) as FetchSearchOptionsAction;

describe('search options reducer', () => {
  let oldState: SearchOptions;
  let newState: SearchOptions;

  beforeEach(() => {
    oldState = {
      isFetching: false,
      hasFailed: false,
      options: {},
    };
  });

  describe('when passed no previous state', () => {
    beforeEach(() => {
      oldState = undefined as any;
      newState = reducer(undefined, unhandledAction);
    });

    it('returns the correct initial state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when receiving an unhandled action', () => {
    beforeEach(() => {
      newState = reducer(oldState, unhandledAction);
    });

    it('returns the old state', () => {
      expect(newState).toEqual(oldState);
    });
  });

  describe('when fetching search options starts', () => {
    beforeEach(() => {
      const action: FetchSearchOptionsAction = {
        type: 'FETCH_SEARCH_OPTIONS.PENDING',
        payload: {
          searchType: 'overnight-boarding',
        },
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when fetching search options succeeds', () => {
    beforeEach(() => {
      const action: FetchSearchOptionsAction = {
        type: 'FETCH_SEARCH_OPTIONS.FULFILLED',
        payload: {
          searchType: 'overnight-boarding',
          options: {
            'test-option-1': {
              type: 'integer',
              required: true,
              label: 'Test Option 1',
              helpText: '',
              category: {
                categoryId: 'service_details',
                rank: 42,
                displayName: 'Service Details',
              },
              rank: 128,
            },
            'test-option-2': {
              type: 'boolean',
              required: true,
              label: 'Test Option 2',
              helpText: '',
              category: {
                categoryId: 'service_details',
                rank: 84,
                displayName: 'Service Details',
              },
              rank: 123,
            },
          },
        },
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when fetching search options fails', () => {
    beforeEach(() => {
      const error = new Error('bang');
      const action: FetchSearchOptionsAction = {
        type: 'FETCH_SEARCH_OPTIONS.REJECTED',
        payload: {
          searchType: 'overnight-boarding',
          error,
        },
        error: true,
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when the search type changes', () => {
    beforeEach(() => {
      const action: SearchTypeChangedAction = {
        type: 'SEARCH.TYPE_CHANGED',
        payload: 'overnight-boarding',
      };
      newState = reducer(oldState, action);
    });

    it('returns the initial state and the new search type', () => {
      expect(newState).toMatchSnapshot();
    });
  });
});
