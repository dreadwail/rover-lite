import {
  FetchResultsFulfilledAction,
  FetchResultsPendingAction,
  FetchResultsRejectedAction,
} from '../../domains/results/actions';
import { SearchFieldChangedAction, SearchTypeChangedAction } from '../../domains/search/actions';

import reducer, { ResultsAction } from './reducer';
import { Listing, Results } from './types';

const unhandledAction = ({ type: 'UNHANDLED_TEST_ACTION' } as any) as ResultsAction;

describe('results reducer', () => {
  let oldState: Results;
  let newState: Results;

  beforeEach(() => {
    oldState = {
      isFetching: false,
      hasFailed: false,
      isStale: false,
      listings: [],
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

  describe('when fetching results starts', () => {
    beforeEach(() => {
      const action: FetchResultsPendingAction = { type: 'FETCH_RESULTS.PENDING' };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when fetching results succeeds', () => {
    beforeEach(() => {
      const testListing: Listing = {
        thumbnailUrl: 'https://example.com/profile.png',
        rank: 0,
        name: 'Test Name',
        badges: [
          {
            content: 'This sitter is Certified as Awesome.',
            imageUrl: 'https://example.com/badge.png',
            title: 'Certified Awesome',
          },
        ],
        tagline: 'Enthusiastic dog lover in Ballard.',
        neighborhood: 'Ballard',
        city: 'Seattle',
        state: 'WA',
        zip: '98117',
        repeatClientCount: 42,
        reviewCount: 12,
        ratingAverage: 4.8,
        featuredReview: 'This sitter is awesome.',
        currencySymbol: '$',
        price: 42.12,
        priceUnit: 'night',
        webUrl: 'https://www.rover.com/members/not-a-real-profile-just-a-test/',
      };
      const listings: Listing[] = [testListing];
      const action: FetchResultsFulfilledAction = {
        type: 'FETCH_RESULTS.FULFILLED',
        payload: listings,
      };
      newState = reducer(oldState, action);
    });

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when fetching results fails', () => {
    const error = new Error('bang');

    beforeEach(() => {
      const action: FetchResultsRejectedAction = {
        type: 'FETCH_RESULTS.REJECTED',
        payload: {
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

    it('returns the correct state', () => {
      expect(newState).toMatchSnapshot();
    });
  });

  describe('when a search field changes', () => {
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
