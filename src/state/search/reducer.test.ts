import { SearchFieldChangedAction, SearchTypeChangedAction } from '../../domains/search/actions';

import reducer, { SearchAction } from './reducer';
import { Search } from './types';

const unhandledAction = ({ type: 'UNHANDLED_TEST_ACTION' } as any) as SearchAction;

describe('search reducer', () => {
  let oldState: Search;
  let newState: Search;

  beforeEach(() => {
    oldState = {
      searchType: 'overnight-boarding',
      inputs: {},
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

  describe('when the search type changes', () => {
    beforeEach(() => {
      const action: SearchTypeChangedAction = {
        type: 'SEARCH.TYPE_CHANGED',
        payload: 'overnight-boarding',
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when a field value changes', () => {
    beforeEach(() => {
      const action: SearchFieldChangedAction = {
        type: 'SEARCH.FIELD_CHANGED',
        payload: {
          key: 'test-key',
          value: 'test-value',
        },
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });
});
