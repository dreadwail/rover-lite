import { Action } from 'redux';

import { SearchType } from '../../state/searchTypes/types';
import { GenericThunkAction } from '../types';

import { getInputs } from './selectors';

export interface SearchTypeChangedAction extends Action {
  readonly type: 'SEARCH.TYPE_CHANGED';
  readonly payload: SearchType;
}

export interface SearchFieldChangedAction extends Action {
  readonly type: 'SEARCH.FIELD_CHANGED';
  readonly payload: {
    readonly key: string;
    readonly value: any;
  };
}

export const searchTypeChanged = (searchType: SearchType): SearchTypeChangedAction => ({
  type: 'SEARCH.TYPE_CHANGED',
  payload: searchType,
});

export type SearchFieldChanged = (key: string, value: any) => GenericThunkAction<void>;
export const searchFieldChanged: SearchFieldChanged = (key, value) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const inputs = getInputs(state);
  const startDate = inputs.start_date;
  const endDate = inputs.end_date;
  if (startDate != null && key === 'end_date' && startDate > value) {
    return;
  }
  if (endDate != null && key === 'start_date' && value > endDate) {
    return;
  }
  const action: SearchFieldChangedAction = {
    type: 'SEARCH.FIELD_CHANGED',
    payload: { key, value },
  };
  dispatch(action);
};
