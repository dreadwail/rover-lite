import { combineReducers } from 'redux';

import results from './results/reducer';
import search from './search/reducer';
import searchOptions from './searchOptions/reducer';
import searchTypes from './searchTypes/reducer';
import { RoverSearchState } from './types';

export default () =>
  combineReducers<RoverSearchState>({
    searchTypes,
    searchOptions,
    search,
    results,
  });
