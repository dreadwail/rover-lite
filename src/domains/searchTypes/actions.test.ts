jest.mock('../../api');

import { request } from '../../api';
import { createMockStore, MockStore } from '../../state/mockStore';
import { Endpoints } from '../../state/searchTypes/types';
import { RoverSearchState } from '../../state/types';

import { fetchSearchTypes } from './actions';

describe('search types actions', () => {
  let store: MockStore<RoverSearchState>;

  beforeEach(() => {
    store = createMockStore<RoverSearchState>();
  });

  describe('.fetchSearchTypes', () => {
    describe('when the api call fails', () => {
      const error = new Error('bang');

      beforeEach(() => {
        (request as jest.Mock).mockImplementation(() => Promise.reject(error));
        return store.dispatch(fetchSearchTypes());
      });

      it('calls the right api', () => {
        expect(request).toHaveBeenCalledWith(
          'GET',
          'https://www.rover.com/api/v3/search-endpoints/'
        );
      });

      it('dispatches the correct actions', () => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    describe('when the api call succeeds', () => {
      beforeEach(() => {
        const endpoints: Endpoints = {
          'overnight-boarding': 'https://www.rover.com/api/v3/search/overnight-boarding/',
        };
        (request as jest.Mock).mockImplementation(() => Promise.resolve(endpoints));
        return store.dispatch(fetchSearchTypes());
      });

      it('calls the right api', () => {
        expect(request).toHaveBeenCalledWith(
          'GET',
          'https://www.rover.com/api/v3/search-endpoints/'
        );
      });

      it('dispatches the correct actions', () => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});
