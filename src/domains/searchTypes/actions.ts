import { Action } from 'redux';

import { request } from '../../api';
import { Endpoints } from '../../state/searchTypes/types';
import { PromiseThunkAction } from '../types';

export interface FetchSearchTypesPendingAction extends Action {
  readonly type: 'FETCH_SEARCH_TYPES.PENDING';
}

export interface FetchSearchTypesFulfilledAction extends Action {
  readonly type: 'FETCH_SEARCH_TYPES.FULFILLED';
  readonly payload: Endpoints;
}

export interface FetchSearchTypesRejectedAction extends Action {
  readonly type: 'FETCH_SEARCH_TYPES.REJECTED';
  readonly payload: {
    readonly error: any;
  };
  readonly error: true;
}

const fetchSearchTypesPending = (): FetchSearchTypesPendingAction => ({
  type: 'FETCH_SEARCH_TYPES.PENDING',
});

const fetchSearchTypesFulfilled = (endpoints: Endpoints): FetchSearchTypesFulfilledAction => ({
  type: 'FETCH_SEARCH_TYPES.FULFILLED',
  payload: endpoints,
});

const fetchSearchTypesRejected = (error: any): FetchSearchTypesRejectedAction => ({
  type: 'FETCH_SEARCH_TYPES.REJECTED',
  payload: {
    error,
  },
  error: true,
});

export type FetchSearchTypes = () => PromiseThunkAction<void>;
export const fetchSearchTypes: FetchSearchTypes = () => async dispatch => {
  dispatch(fetchSearchTypesPending());
  try {
    const response = await request<Endpoints>(
      'GET',
      'https://www.rover.com/api/v3/search-endpoints/'
    );
    dispatch(fetchSearchTypesFulfilled(response));
  } catch (err) {
    dispatch(fetchSearchTypesRejected(err));
  }
};
