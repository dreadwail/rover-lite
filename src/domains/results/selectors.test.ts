import { createMockState } from '../../state/mockState';
import { Listing, Results } from '../../state/results/types';

import { getListings, hasFailed, isFetching, isStale } from './selectors';

describe('results selectors', () => {
  describe('.isFetching', () => {
    let selected: boolean;

    describe('when fetching', () => {
      beforeEach(() => {
        const results: Results = {
          isFetching: true,
          hasFailed: false,
          isStale: false,
          listings: [],
        };
        const state = createMockState({ results });
        selected = isFetching(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });

    describe('when not fetching', () => {
      beforeEach(() => {
        const results: Results = {
          isFetching: false,
          hasFailed: false,
          isStale: false,
          listings: [],
        };
        const state = createMockState({ results });
        selected = isFetching(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });
  });

  describe('.hasFailed', () => {
    let selected: boolean;

    describe('when fetching has failed', () => {
      beforeEach(() => {
        const results: Results = {
          isFetching: false,
          hasFailed: true,
          isStale: false,
          listings: [],
        };
        const state = createMockState({ results });
        selected = hasFailed(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });

    describe('when fetching hasnt failed', () => {
      beforeEach(() => {
        const results: Results = {
          isFetching: false,
          hasFailed: false,
          isStale: false,
          listings: [],
        };
        const state = createMockState({ results });
        selected = hasFailed(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });
  });

  describe('.isStale', () => {
    let selected: boolean;

    describe('when results are stale', () => {
      beforeEach(() => {
        const results: Results = {
          isFetching: false,
          hasFailed: false,
          isStale: true,
          listings: [],
        };
        const state = createMockState({ results });
        selected = isStale(state);
      });

      it('returns true', () => {
        expect(selected).toBe(true);
      });
    });

    describe('when results are fresh', () => {
      beforeEach(() => {
        const results: Results = {
          isFetching: false,
          hasFailed: false,
          isStale: false,
          listings: [],
        };
        const state = createMockState({ results });
        selected = isStale(state);
      });

      it('returns false', () => {
        expect(selected).toBe(false);
      });
    });
  });

  describe('.getListings', () => {
    let selected: Listing[];

    beforeEach(() => {
      const results: Results = {
        isFetching: false,
        hasFailed: false,
        isStale: false,
        listings: [
          {
            thumbnailUrl: 'a',
            rank: 0,
            name: 'b',
            badges: [],
            tagline: 'c',
            neighborhood: 'Ballard',
            city: 'Seattle',
            state: 'WA',
            zip: '98117',
            repeatClientCount: 3,
            reviewCount: 4,
            ratingAverage: 4.5,
            featuredReview: 'd',
            currencySymbol: '$',
            price: 42.0,
            priceUnit: 'night',
            webUrl: 'e',
          },
        ],
      };
      const state = createMockState({ results });
      selected = getListings(state);
    });

    it('returns the current listings', () => {
      expect(selected).toMatchSnapshot();
    });
  });
});
