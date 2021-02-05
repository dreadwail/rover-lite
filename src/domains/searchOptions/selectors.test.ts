import { createMockState } from '../../state/mockState';
import { Options, OptionCategory, SearchOptions } from '../../state/searchOptions/types';
import { RoverSearchState } from '../../state/types';

import { getOptionsByCategoryId, getRankedCategories, hasFailed, isFetching } from './selectors';

describe('search options selectors', () => {
  describe('.getRankedCategories', () => {
    let selected: OptionCategory[];

    describe('when there are no options', () => {
      beforeEach(() => {
        const searchOptions: SearchOptions = {
          isFetching: false,
          hasFailed: false,
          options: {},
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = getRankedCategories(state);
      });

      it('returns an empty array', () => {
        expect(selected).toEqual([]);
      });
    });

    describe('when there are options', () => {
      beforeEach(() => {
        const options: Options = {
          start_date: {
            type: 'date',
            required: false,
            label: 'Drop Off',
            helpText: "The date of the drop-off at the sitter's location",
            category: {
              categoryId: 'service_details',
              rank: 9,
              displayName: 'Service Details',
            },
            rank: 42,
          },
          end_date: {
            type: 'date',
            required: false,
            label: 'Pick Up',
            helpText: "The date of the pick-up from the sitter's location",
            category: {
              categoryId: 'provider_skills',
              rank: 2,
              displayName: 'Provider Skills',
            },
            rank: 2,
          },
        };

        const searchOptions: SearchOptions = {
          isFetching: false,
          hasFailed: false,
          options,
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = getRankedCategories(state);
      });

      it('returns the categories ordered by their rank', () => {
        expect(selected).toMatchSnapshot();
      });
    });
  });

  describe('.getOptionsByCategoryId', () => {
    let selected: Record<string, Options>;

    describe('when there are no search options', () => {
      beforeEach(() => {
        const searchOptions: SearchOptions = {
          isFetching: false,
          hasFailed: false,
          options: {},
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = getOptionsByCategoryId(state);
      });

      it('returns an empty object', () => {
        expect(selected).toEqual({});
      });
    });

    describe('when there are options', () => {
      beforeEach(() => {
        const options: Options = {
          start_date: {
            type: 'date',
            required: false,
            label: 'Drop Off',
            helpText: "The date of the drop-off at the sitter's location",
            category: {
              categoryId: 'service_details',
              rank: 1,
              displayName: 'Service Details',
            },
            rank: 1,
          },
          end_date: {
            type: 'date',
            required: false,
            label: 'Pick Up',
            helpText: "The date of the pick-up from the sitter's location",
            category: {
              categoryId: 'provider_skills',
              rank: 2,
              displayName: 'Provider Skills',
            },
            rank: 2,
          },
        };

        const searchOptions: SearchOptions = {
          isFetching: false,
          hasFailed: false,
          options,
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = getOptionsByCategoryId(state);
      });

      it('returns the expected options', () => {
        expect(selected).toMatchSnapshot();
      });
    });
  });

  describe('.hasFailed', () => {
    let selected: boolean;

    describe('when fetching search options has failed', () => {
      beforeEach(() => {
        const searchOptions: SearchOptions = {
          isFetching: false,
          hasFailed: true,
          options: {},
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = hasFailed(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });

    describe('when fetching search types has not failed', () => {
      beforeEach(() => {
        const searchOptions: SearchOptions = {
          isFetching: false,
          hasFailed: false,
          options: {},
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = hasFailed(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });
  });

  describe('.isFetching', () => {
    let selected: boolean;

    describe('when fetching search options', () => {
      beforeEach(() => {
        const searchOptions: SearchOptions = {
          isFetching: true,
          hasFailed: false,
          options: {},
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = isFetching(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });

    describe('when not fetching search options', () => {
      beforeEach(() => {
        const searchOptions: SearchOptions = {
          isFetching: false,
          hasFailed: false,
          options: {},
        };
        const state: RoverSearchState = createMockState({ searchOptions });
        selected = isFetching(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });
  });
});
