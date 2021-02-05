jest.mock('../../api');

import { request } from '../../api';
import { createMockStore, MockStore } from '../../state/mockStore';
import { SearchType, SearchTypes } from '../../state/searchTypes/types';
import { RoverSearchState } from '../../state/types';

import { fetchSearchOptions } from './actions';
import { OptionsResponse } from './normalize';

describe('search options actions', () => {
  let store: MockStore<RoverSearchState>;

  beforeEach(() => {
    store = createMockStore<RoverSearchState>();
  });

  describe('.fetchSearchOptions', () => {
    const searchType: SearchType = 'overnight-boarding';

    describe('when the search type hasnt been loaded yet', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {},
        };
        store = createMockStore<RoverSearchState>({ searchTypes });
        return store.dispatch(fetchSearchOptions(searchType));
      });

      it('makes no attempt to fetch options', () => {
        expect(request).not.toHaveBeenCalled();
      });
    });

    describe('when the search type has loaded', () => {
      beforeEach(() => {
        const searchTypes: SearchTypes = {
          isFetching: false,
          hasFailed: false,
          endpoints: {
            [searchType]: 'https://www.rover.com/api/v3/search/overnight-boarding/',
          },
        };
        store = createMockStore<RoverSearchState>({ searchTypes });
      });

      describe('when the api call fails', () => {
        const error = new Error('bang');

        beforeEach(() => {
          (request as jest.Mock).mockImplementation(() => Promise.reject(error));
          return store.dispatch(fetchSearchOptions(searchType));
        });

        it('calls the right api', () => {
          expect(request).toHaveBeenCalledWith(
            'OPTIONS',
            `https://www.rover.com/api/v3/search/${searchType}/`
          );
        });

        it('dispatches the correct actions', () => {
          expect(store.getActions()).toMatchSnapshot();
        });
      });

      describe('when the api call succeeds', () => {
        beforeEach(() => {
          const response: OptionsResponse = {
            name: 'Search',
            description: 'Search compatible providers around location',
            renders: ['application/json', 'text/html'],
            parses: ['application/json'],
            actions: {
              GET: {
                start_date: {
                  type: 'date',
                  required: false,
                  label: 'Drop Off',
                  help_text: "The date of the drop-off at the sitter's location",
                  category: 'service_details',
                  category_rank: 1,
                  category_display_name: 'Service Details',
                  rank: 1,
                },
              },
            },
          };
          (request as jest.Mock).mockImplementation(() => Promise.resolve(response));
          return store.dispatch(fetchSearchOptions(searchType));
        });

        it('calls the right api', () => {
          expect(request).toHaveBeenCalledWith(
            'OPTIONS',
            `https://www.rover.com/api/v3/search/${searchType}/`
          );
        });

        it('dispatches the correct actions', () => {
          expect(store.getActions()).toMatchSnapshot();
        });
      });
    });
  });
});
