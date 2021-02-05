jest.mock('../../domains/searchTypes/actions');
jest.mock('../../domains/search/actions');

import { Action, Dispatch } from 'redux';

import { searchTypeChanged } from '../../domains/search/actions';
import { fetchSearchTypes } from '../../domains/searchTypes/actions';
import { createMockState } from '../../state/mockState';
import { Search } from '../../state/search/types';
import { SearchType, SearchTypes } from '../../state/searchTypes/types';

import {
  mapDispatchToProps,
  mapStateToProps,
  MappedDispatchProps,
  MappedStateProps,
} from './SearchTypesContainer';

describe('SearchTypesContainer', () => {
  describe('.mapStateToProps', () => {
    let mappedStateProps: MappedStateProps;

    beforeEach(() => {
      const searchTypes: SearchTypes = {
        isFetching: false,
        hasFailed: false,
        endpoints: {
          'overnight-boarding': 'https://www.rover.com/api/v3/search/overnight-boarding/',
        },
      };
      const search: Search = {
        searchType: 'overnight-boarding',
        inputs: {},
      };
      const state = createMockState({ searchTypes, search });
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

    describe('.fetchSearchTypes', () => {
      let fetchSearchTypesAction: Action;

      beforeEach(() => {
        fetchSearchTypesAction = { type: 'TEST_ACTION' };
        (fetchSearchTypes as jest.Mock).mockReturnValue(fetchSearchTypesAction);
        mappedDispatchProps.fetchSearchTypes();
      });

      it('calls the correct action creator', () => {
        expect(fetchSearchTypes).toHaveBeenCalled();
      });

      it('dispatches the correct action', () => {
        expect(dispatch).toHaveBeenCalledWith(fetchSearchTypesAction);
      });
    });

    describe('.onSearchTypeSelected', () => {
      let searchTypeChangedAction: Action;

      const searchType: SearchType = 'overnight-boarding';

      beforeEach(() => {
        searchTypeChangedAction = { type: 'TEST_ACTION' };
        (searchTypeChanged as jest.Mock).mockReturnValue(searchTypeChangedAction);
        mappedDispatchProps.onSearchTypeSelected(searchType);
      });

      it('calls the correct action creator', () => {
        expect(searchTypeChanged).toHaveBeenCalledWith(searchType);
      });

      it('dispatches the correct action', () => {
        expect(dispatch).toHaveBeenCalledWith(searchTypeChangedAction);
      });
    });
  });
});
