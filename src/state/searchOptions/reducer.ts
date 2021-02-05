import { Reducer } from 'redux';

import { SearchTypeChangedAction } from '../../domains/search/actions';
import {
  FetchSearchOptionsFulfilledAction,
  FetchSearchOptionsPendingAction,
  FetchSearchOptionsRejectedAction,
} from '../../domains/searchOptions/actions';

import { SearchOptions } from './types';

export type FetchSearchOptionsAction =
  | FetchSearchOptionsPendingAction
  | FetchSearchOptionsFulfilledAction
  | FetchSearchOptionsRejectedAction
  | SearchTypeChangedAction;

const initialState: SearchOptions = {
  isFetching: false,
  hasFailed: false,
  options: {},
};

const reducer: Reducer<SearchOptions, FetchSearchOptionsAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'FETCH_SEARCH_OPTIONS.PENDING':
      return { ...state, isFetching: true, hasFailed: false };
    case 'FETCH_SEARCH_OPTIONS.FULFILLED':
      return { ...state, isFetching: false, hasFailed: false, options: action.payload.options };
    case 'FETCH_SEARCH_OPTIONS.REJECTED':
      return { ...state, isFetching: false, hasFailed: true };
    case 'SEARCH.TYPE_CHANGED':
      return initialState;
    default: {
      return state;
    }
  }
};

export default reducer;
