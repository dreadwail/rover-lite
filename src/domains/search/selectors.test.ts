import { createMockState } from '../../state/mockState';
import { Search, SearchInputs } from '../../state/search/types';
import { SearchType } from '../../state/searchTypes/types';

import { getInputs, getSearchType } from './selectors';

describe('search selectors', () => {
  describe('.getSearchType', () => {
    let selected: SearchType;

    beforeEach(() => {
      const search: Search = {
        searchType: 'overnight-boarding',
        inputs: {},
      };
      const state = createMockState({ search });
      selected = getSearchType(state);
    });

    it('returns the current search type', () => {
      expect(selected).toEqual('overnight-boarding');
    });
  });

  describe('.getInputs', () => {
    let selected: SearchInputs;

    describe('when there are inputs', () => {
      beforeEach(() => {
        const search: Search = {
          searchType: 'overnight-boarding',
          inputs: {
            'test-key': 'test-value',
          },
        };
        const state = createMockState({ search });
        selected = getInputs(state);
      });

      it('returns the inputs', () => {
        expect(selected).toEqual({ 'test-key': 'test-value' });
      });
    });

    describe('when there are no inputs', () => {
      beforeEach(() => {
        const search: Search = {
          searchType: 'overnight-boarding',
          inputs: {},
        };
        const state = createMockState({ search });
        selected = getInputs(state);
      });

      it('returns an empty object', () => {
        expect(selected).toEqual({});
      });
    });
  });
});
