jest.mock('../../domains/searchOptions/actions');
jest.mock('../../domains/search/actions');

import { Action, Dispatch } from 'redux';

import { searchFieldChanged } from '../../domains/search/actions';
import { fetchSearchOptions } from '../../domains/searchOptions/actions';
import { createMockState } from '../../state/mockState';
import { Search, SearchInputs } from '../../state/search/types';
import { Options, SearchOptions } from '../../state/searchOptions/types';
import { SearchTypes } from '../../state/searchTypes/types';

import {
  mapDispatchToProps,
  mapStateToProps,
  MappedDispatchProps,
  MappedStateProps,
} from './SearchOptionsContainer';

describe('SearchOptionsContainer', () => {
  describe('.mapStateToProps', () => {
    let mappedStateProps: MappedStateProps;

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
            categoryId: 'service_details',
            rank: 2,
            displayName: 'Service Details',
          },
          rank: 2,
        },
      };
      const searchOptions: SearchOptions = {
        isFetching: false,
        hasFailed: false,
        options,
      };
      const searchTypes: SearchTypes = {
        isFetching: false,
        hasFailed: false,
        endpoints: {},
      };
      const inputs: SearchInputs = {
        start_date: 'test-value-1',
        end_date: 'test-value-2',
        test_key: 'test-value-3',
      };
      const search: Search = {
        searchType: 'overnight-boarding',
        latitude: 47.6843725,
        longitude: -122.3874837,
        inputs,
      };
      const state = createMockState({ searchOptions, searchTypes, search });
      mappedStateProps = mapStateToProps(state, {});
    });

    it('returns the correctly mapped props', () => {
      expect(mappedStateProps).toMatchSnapshot();
    });
  });

  describe('.mapDispatchToProps', () => {
    let dispatch: Dispatch;
    let mappedDispatchProps: MappedDispatchProps;

    beforeEach(() => {
      dispatch = jest.fn().mockName('dispatch');
      mappedDispatchProps = mapDispatchToProps(dispatch, {});
    });

    describe('.fetchSearchOptions', () => {
      let fetchSearchOptionsAction: Action;

      beforeEach(() => {
        fetchSearchOptionsAction = { type: 'TEST_ACTION' };
        (fetchSearchOptions as jest.Mock).mockReturnValue(fetchSearchOptionsAction);
        mappedDispatchProps.fetchSearchOptions('overnight-boarding');
      });

      it('calls the correct action creator', () => {
        expect(fetchSearchOptions).toHaveBeenCalledWith('overnight-boarding');
      });

      it('dispatches the correct action', () => {
        expect(dispatch).toHaveBeenCalledWith(fetchSearchOptionsAction);
      });
    });

    describe('.onSearchFieldChanged', () => {
      let searchFieldChangedAction: Action;

      beforeEach(() => {
        searchFieldChangedAction = { type: 'TEST_ACTION' };
        (searchFieldChanged as jest.Mock).mockReturnValue(searchFieldChangedAction);
        mappedDispatchProps.onSearchFieldChanged('test-key', 'test-value');
      });

      it('calls the correct action creator', () => {
        expect(searchFieldChanged).toHaveBeenCalledWith('test-key', 'test-value');
      });

      it('dispatches the correct action', () => {
        expect(dispatch).toHaveBeenCalledWith(searchFieldChangedAction);
      });
    });
  });
});
