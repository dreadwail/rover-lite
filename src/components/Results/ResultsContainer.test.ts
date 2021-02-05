jest.mock('../../domains/results/actions');

import { Action, Dispatch } from 'redux';

import { debouncedFetchResults } from '../../domains/results/actions';
import { createMockState } from '../../state/mockState';
import { Results } from '../../state/results/types';

import {
  mapDispatchToProps,
  mapStateToProps,
  MappedDispatchProps,
  MappedStateProps,
} from './ResultsContainer';

describe('SearchOptionsContainer', () => {
  describe('.mapStateToProps', () => {
    let mappedStateProps: MappedStateProps;

    beforeEach(() => {
      const results: Results = {
        isFetching: false,
        hasFailed: false,
        isStale: false,
        listings: [],
      };
      const state = createMockState({ results });
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

    describe('.fetchResults', () => {
      let fetchResultsAction: Action;

      beforeEach(() => {
        fetchResultsAction = { type: 'TEST_ACTION' };
        (debouncedFetchResults as jest.Mock).mockReturnValue(fetchResultsAction);
        mappedDispatchProps.fetchResults();
      });

      it('calls the correct action creator', () => {
        expect(debouncedFetchResults).toHaveBeenCalled();
      });

      it('dispatches the correct action', () => {
        expect(dispatch).toHaveBeenCalledWith(fetchResultsAction);
      });
    });
  });
});
