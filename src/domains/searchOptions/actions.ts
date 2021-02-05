import { Action } from 'redux';

import { request } from '../../api';
import { Options } from '../../state/searchOptions/types';
import { SearchType } from '../../state/searchTypes/types';
import { getEndpointUrl } from '../searchTypes/selectors';
import { PromiseThunkAction } from '../types';

import { normalize, OptionsResponse } from './normalize';

export interface FetchSearchOptionsPendingAction extends Action {
  readonly type: 'FETCH_SEARCH_OPTIONS.PENDING';
  readonly payload: {
    readonly searchType: SearchType;
  };
}

export interface FetchSearchOptionsFulfilledAction extends Action {
  readonly type: 'FETCH_SEARCH_OPTIONS.FULFILLED';
  readonly payload: {
    readonly searchType: SearchType;
    readonly options: Options;
  };
}

export interface FetchSearchOptionsRejectedAction extends Action {
  readonly type: 'FETCH_SEARCH_OPTIONS.REJECTED';
  readonly payload: {
    readonly searchType: SearchType;
    readonly error: any;
  };
  readonly error: true;
}

const fetchSearchOptionsPending = (searchType: SearchType): FetchSearchOptionsPendingAction => ({
  type: 'FETCH_SEARCH_OPTIONS.PENDING',
  payload: {
    searchType,
  },
});

const fetchSearchOptionsFulfilled = (
  searchType: SearchType,
  options: Options
): FetchSearchOptionsFulfilledAction => ({
  type: 'FETCH_SEARCH_OPTIONS.FULFILLED',
  payload: {
    searchType,
    options,
  },
});

const fetchSearchOptionsRejected = (
  searchType: SearchType,
  error: any
): FetchSearchOptionsRejectedAction => ({
  type: 'FETCH_SEARCH_OPTIONS.REJECTED',
  payload: {
    searchType,
    error,
  },
  error: true,
});

export type FetchSearchOptions = (searchType: SearchType) => PromiseThunkAction<void>;
export const fetchSearchOptions: FetchSearchOptions = searchType => async (dispatch, getState) => {
  dispatch(fetchSearchOptionsPending(searchType));
  try {
    const state = getState();
    const endpointUrl = getEndpointUrl(state, searchType);
    if (!endpointUrl) {
      throw new Error(`Unhandled search type: ${searchType}`);
    }
    const response = await request<OptionsResponse>('OPTIONS', endpointUrl);
    const normalizedOptions = normalize(response);
    dispatch(fetchSearchOptionsFulfilled(searchType, normalizedOptions));
  } catch (err) {
    dispatch(fetchSearchOptionsRejected(searchType, err));
  }
};
