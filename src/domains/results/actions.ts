import { Action } from 'redux';

import { request } from '../../api/http';
import { urlEncodeQuery } from '../../api/query';
import { Listing } from '../../state/results/types';
import { SearchInputs } from '../../state/search/types';
import debouncedAction from '../debouncedThunk';
import { getInputs, getLatLong, getSearchType } from '../search/selectors';
import { PromiseThunkAction } from '../types';

import { normalize, RawSearchResponse } from './normalize';

export interface FetchResultsPendingAction extends Action {
  readonly type: 'FETCH_RESULTS.PENDING';
}

export interface FetchResultsFulfilledAction extends Action {
  readonly type: 'FETCH_RESULTS.FULFILLED';
  readonly payload: Listing[];
}

export interface FetchResultsRejectedAction extends Action {
  readonly type: 'FETCH_RESULTS.REJECTED';
  readonly payload: {
    readonly error: any;
  };
  readonly error: true;
}

const fetchResultsPending = (): FetchResultsPendingAction => ({
  type: 'FETCH_RESULTS.PENDING',
});

const fetchResultsFulfilled = (listings: Listing[]): FetchResultsFulfilledAction => ({
  type: 'FETCH_RESULTS.FULFILLED',
  payload: listings,
});

const fetchResultsRejected = (error: any): FetchResultsRejectedAction => ({
  type: 'FETCH_RESULTS.REJECTED',
  payload: {
    error,
  },
  error: true,
});

export type FetchResults = () => PromiseThunkAction<void>;
export const fetchResults: FetchResults = () => async (dispatch, getState) => {
  dispatch(fetchResultsPending());
  try {
    const state = getState();

    const searchType = getSearchType(state);
    const [latitude, longitude] = getLatLong(state);

    const defaultInputs: SearchInputs = {
      centerlat: latitude,
      centerlng: longitude,
      service_type: searchType,
    };
    const userInputs = getInputs(state);
    const inputs = { ...defaultInputs, ...userInputs };
    const encodedQuery = urlEncodeQuery(inputs);

    const urlBase = 'https://www.rover.com/api/v3/search';
    const url = `${urlBase}/${searchType}/?${encodedQuery}`;

    const response = await request<RawSearchResponse>('GET', url);

    const normalizedListings = normalize(response);
    dispatch(fetchResultsFulfilled(normalizedListings));
  } catch (err) {
    dispatch(fetchResultsRejected(err));
  }
};

export const debouncedFetchResults = debouncedAction(fetchResults, 250);
