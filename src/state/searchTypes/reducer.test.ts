import reducer, { FetchSearchTypesAction } from './reducer';
import { SearchTypes } from './types';

const unhandledAction = ({ type: 'UNHANDLED_TEST_ACTION' } as any) as FetchSearchTypesAction;

describe('search types reducer', () => {
  let oldState: SearchTypes;
  let newState: SearchTypes;

  beforeEach(() => {
    oldState = {
      isFetching: false,
      hasFailed: false,
      endpoints: {},
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

  describe('when fetching search types starts', () => {
    beforeEach(() => {
      const action: FetchSearchTypesAction = { type: 'FETCH_SEARCH_TYPES.PENDING' };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when fetching search types succeeds', () => {
    beforeEach(() => {
      const action: FetchSearchTypesAction = {
        type: 'FETCH_SEARCH_TYPES.FULFILLED',
        payload: {
          'overnight-boarding': 'https://www.rover.com/api/v3/search/overnight-boarding/',
        },
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when fetching search types fails', () => {
    beforeEach(() => {
      const error = new Error('bang');
      const action: FetchSearchTypesAction = {
        type: 'FETCH_SEARCH_TYPES.REJECTED',
        payload: { error },
        error: true,
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });
});
