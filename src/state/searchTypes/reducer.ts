import { Reducer } from 'redux';

import {
  FetchSearchTypesFulfilledAction,
  FetchSearchTypesPendingAction,
  FetchSearchTypesRejectedAction,
} from '../../domains/searchTypes/actions';

import { SearchTypes } from './types';

export type FetchSearchTypesAction =
  | FetchSearchTypesPendingAction
  | FetchSearchTypesFulfilledAction
  | FetchSearchTypesRejectedAction;

const initialState: SearchTypes = {
  isFetching: false,
  hasFailed: false,
  endpoints: {},
};

const reducer: Reducer<SearchTypes, FetchSearchTypesAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH_TYPES.PENDING':
      return { ...state, isFetching: true, hasFailed: false };
    case 'FETCH_SEARCH_TYPES.FULFILLED':
      return { ...state, isFetching: false, hasFailed: false, endpoints: action.payload };
    case 'FETCH_SEARCH_TYPES.REJECTED':
      return { ...state, isFetching: false, hasFailed: true };
    default: {
      return state;
    }
  }
};

export default reducer;
