import { Reducer } from 'redux';

import { SearchFieldChangedAction, SearchTypeChangedAction } from '../../domains/search/actions';

import { Search } from './types';

export type SearchAction = SearchTypeChangedAction | SearchFieldChangedAction;

const hardCodedLatitude = 47.6843725;
const hardCodedLongitude = -122.3874837;

const initialState: Search = {
  searchType: 'overnight-boarding',
  latitude: hardCodedLatitude,
  longitude: hardCodedLongitude,
  inputs: {},
};

const reducer: Reducer<Search, SearchAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH.TYPE_CHANGED':
      return { ...initialState, searchType: action.payload };
    case 'SEARCH.FIELD_CHANGED':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.key]: action.payload.value,
        },
      };
    default: {
      return state;
    }
  }
};

export default reducer;
