import { createMockState } from '../../state/mockState';
import { createMockStore, MockStore } from '../../state/mockStore';
import { Search } from '../../state/search/types';
import { RoverSearchState } from '../../state/types';

import { searchFieldChanged, searchTypeChanged } from './actions';

describe('search actions', () => {
  describe('searchTypeChanged', () => {
    it('creates the correct action', () => {
      expect(searchTypeChanged('overnight-boarding')).toMatchSnapshot();
    });
  });

  describe('searchFieldChanged', () => {
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
      store.dispatch(searchFieldChanged('test-key', 'test-value'));
    });

    it('dispatches the correct actions', () => {
      expect(store.getActions()).toMatchSnapshot();
    });

    describe('with a start_date already in the store', () => {
      beforeEach(() => {
        const search: Search = {
          searchType: 'overnight-boarding',
          latitude: 47.6843725,
          longitude: -122.3874837,
          inputs: {
            start_date: new Date(1984, 7, 28),
          },
        };
        state = createMockState({ search });
        store = createMockStore<RoverSearchState>(state);
      });

      describe('when trying to change end_date to be less than start_date', () => {
        beforeEach(() => {
          store.dispatch(searchFieldChanged('end_date', new Date(1970, 0, 1)));
        });

        it('dispatches no actions', () => {
          expect(store.getActions()).toEqual([]);
        });
      });

      describe('when trying to change end_date to be greater than start_date', () => {
        beforeEach(() => {
          store.dispatch(searchFieldChanged('end_date', new Date(2050, 0, 1)));
        });

        it('dispatches a field changed action', () => {
          expect(store.getActions()).toMatchSnapshot();
        });
      });
    });

    describe('with a end_date already in the store', () => {
      beforeEach(() => {
        const search: Search = {
          searchType: 'overnight-boarding',
          latitude: 47.6843725,
          longitude: -122.3874837,
          inputs: {
            end_date: new Date(1984, 7, 28),
          },
        };
        state = createMockState({ search });
        store = createMockStore<RoverSearchState>(state);
      });

      describe('when trying to change start_date to be greater than end_date', () => {
        beforeEach(() => {
          store.dispatch(searchFieldChanged('start_date', new Date(2050, 0, 1)));
        });

        it('dispatches no actions', () => {
          expect(store.getActions()).toEqual([]);
        });
      });

      describe('when trying to change start_date to be less than end_date', () => {
        beforeEach(() => {
          store.dispatch(searchFieldChanged('start_date', new Date(1970, 0, 1)));
        });

        it('dispatches a field changed action', () => {
          expect(store.getActions()).toMatchSnapshot();
        });
      });
    });
  });
});
