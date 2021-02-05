import { createMockState } from '../../state/mockState';
import { SearchType, SearchTypes } from '../../state/searchTypes/types';
import { RoverSearchState } from '../../state/types';

import {
  getEndpointUrl,
  getSearchTypes,
  hasFailed,
  isFetching,
  isSearchTypesLoaded,
} from './selectors';

describe('search types selectors', () => {
  describe('.getSearchTypes', () => {
    let selected: SearchType[];

    describe('when there are no search types', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {},
        };
        const state: RoverSearchState = createMockState({ searchTypes });
        selected = getSearchTypes(state);
      });

      it('returns an empty array', () => {
        expect(selected).toEqual([]);
      });
    });

    describe('when there are search types', () => {
      beforeEach(() => {
        const endpoints = {
          'overnight-boarding': 'https://www.rover.com/api/v3/search/overnight-boarding/',
          'overnight-traveling': 'https://www.rover.com/api/v3/search/overnight-traveling/',
        };

        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints,
        };
        const state: RoverSearchState = createMockState({ searchTypes });
        selected = getSearchTypes(state);
      });

      it('returns the search types', () => {
        expect(selected).toEqual(['overnight-boarding', 'overnight-traveling']);
      });
    });
  });

  describe('.hasFailed', () => {
    let selected: boolean;

    describe('when fetching search types has failed', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: true,
          endpoints: {},
        };
        const state: RoverSearchState = createMockState({ searchTypes });
        selected = hasFailed(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });

    describe('when fetching search types has not failed', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {},
        };
        const state: RoverSearchState = createMockState({ searchTypes });
        selected = hasFailed(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });
  });

  describe('.isFetching', () => {
    let selected: boolean;

    describe('when fetching search types', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: true,
          hasFailed: false,
          endpoints: {},
        };
        const state: RoverSearchState = createMockState({ searchTypes });
        selected = isFetching(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });

    describe('when not fetching search types', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {},
        };
        const state: RoverSearchState = createMockState({ searchTypes });
        selected = isFetching(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });
  });

  describe('.getEndpointUrl', () => {
    const searchType: SearchType = 'overnight-boarding';

    let selected: string | undefined;

    describe('when the endpoint type has not been loaded', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {},
        };
        const state = createMockState({ searchTypes });
        selected = getEndpointUrl(state, searchType);
      });

      it('returns undefined', () => {
        expect(selected).toBeUndefined();
      });
    });

    describe('when the endpoint type has been loaded', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {
            [searchType]: 'https://www.rover.com/api/v3/search/overnight-boarding/',
          },
        };
        const state = createMockState({ searchTypes });
        selected = getEndpointUrl(state, searchType);
      });

      it('returns the endpoint', () => {
        expect(selected).toEqual('https://www.rover.com/api/v3/search/overnight-boarding/');
      });
    });
  });

  describe('.isSearchTypesLoaded', () => {
    let selected: boolean;

    describe('when no search types have been loaded', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {},
        };
        const state = createMockState({ searchTypes });
        selected = isSearchTypesLoaded(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });

    describe('when at least one search type has been loaded', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {
            'overnight-boarding': 'https://www.rover.com/api/v3/search/overnight-boarding/',
          },
        };
        const state = createMockState({ searchTypes });
        selected = isSearchTypesLoaded(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });
  });
});
