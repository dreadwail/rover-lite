jest.mock('../../api/http');

import { request } from '../../api/http';
import { createMockState } from '../../state/mockState';
import { createMockStore, MockStore } from '../../state/mockStore';
import { Search } from '../../state/search/types';
import { RoverSearchState } from '../../state/types';

import { fetchResults } from './actions';
import { RawResult, RawSearchResponse } from './normalize';

describe('results actions', () => {
  let state: RoverSearchState;
  let store: MockStore<RoverSearchState>;

  beforeEach(() => {
    const search: Search = {
      searchType: 'overnight-boarding',
      latitude: 47.6843725,
      longitude: -122.3874837,
      inputs: {},
    };
    state = createMockState({ search });
    store = createMockStore<RoverSearchState>(state);
  });

  describe('.fetchResults', () => {
    describe('when the api call fails', () => {
      const error = new Error('bang');

      beforeEach(() => {
        (request as jest.Mock).mockImplementation(() => Promise.reject(error));
        return store.dispatch(fetchResults());
      });

      it('calls the right api', () => {
        const { latitude, longitude, searchType } = state.search;
        const urlBase = 'https://www.rover.com/api/v3/search';
        const query = `centerlat=${latitude}&centerlng=${longitude}&service_type=${searchType}`;
        const expectedUrl = `${urlBase}/${searchType}/?${query}`;
        expect(request).toHaveBeenCalledWith('GET', expectedUrl);
      });

      it('dispatches the correct actions', () => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    describe('when the api call succeeds', () => {
      beforeEach(() => {
        const results: RawResult[] = [
          {
            rank: 0,
            person_summary: {
              responsiveness: {
                photo_rate_desc: 'a',
                percent_desc: 'b',
                time_short_desc: 'c',
              },
              first_name: 'd',
              reviews_count: 4,
              profile_photo: {
                small: 'e',
              },
              ratings_average: '4.8',
              web_url: 'f',
              images: [],
              provider_profile: {
                hosting_service_preferences: {
                  dogs_preferences_attributes: [],
                  accepted_dogs_attributes: [],
                  dogs_experience_attributes: [],
                  attributes: [],
                },
                traveling_service_preferences: {
                  dogs_preferences_attributes: [],
                  accepted_dogs_attributes: [],
                  dogs_experience_attributes: [],
                  attributes: [],
                },
                attributes: [],
                years_of_experience: 4,
              },
              attributes: {},
              badges: [],
            },
            reviews_count: 2,
            neighborhood: 'Ballard',
            price_unit: 'night',
            city: 'Seattle',
            zip: '98117',
            title: 'g',
            state: 'WA',
            contact_url: 'h',
            person_name: 'i',
            price: '42.0',
            review_text: 'j',
            review_dog_photo_url: 'k',
            badge_data: [],
            repeat_client_count: 5,
            reviews: [],
            ratings_average: '4.8',
            currency_symbol: '$',
          },
        ];
        const response: RawSearchResponse = { results };
        (request as jest.Mock).mockImplementation(() => Promise.resolve(response));
        return store.dispatch(fetchResults());
      });

      it('calls the right api', () => {
        const { latitude, longitude, searchType } = state.search;
        const urlBase = 'https://www.rover.com/api/v3/search';
        const query = `centerlat=${latitude}&centerlng=${longitude}&service_type=${searchType}`;
        const expectedUrl = `${urlBase}/${searchType}/?${query}`;
        expect(request).toHaveBeenCalledWith('GET', expectedUrl);
      });

      it('dispatches the correct actions', () => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});
