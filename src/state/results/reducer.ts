import { Reducer } from 'redux';

import {
  FetchResultsFulfilledAction,
  FetchResultsPendingAction,
  FetchResultsRejectedAction,
} from '../../domains/results/actions';
import { SearchFieldChangedAction, SearchTypeChangedAction } from '../../domains/search/actions';

import { Results } from './types';

export type ResultsAction =
  | FetchResultsPendingAction
  | FetchResultsFulfilledAction
  | FetchResultsRejectedAction
  | SearchTypeChangedAction
  | SearchFieldChangedAction;

const initialState: Results = {
  isFetching: false,
  hasFailed: false,
  isStale: true,
  listings: [],
};

const reducer: Reducer<Results, ResultsAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RESULTS.PENDING':
      return { ...state, isFetching: true, hasFailed: false, isStale: false };
    case 'FETCH_RESULTS.FULFILLED':
      return {
        ...state,
        isFetching: false,
        hasFailed: false,
        isStale: false,
        listings: action.payload,
      };
    case 'FETCH_RESULTS.REJECTED':
      return { ...state, isFetching: false, hasFailed: true };
    case 'SEARCH.TYPE_CHANGED':
      return { ...state, isStale: true };
    case 'SEARCH.FIELD_CHANGED':
      return { ...state, isStale: true };
    default: {
      return state;
    }
  }
};

export default reducer;
