import { SearchInputs } from '../../state/search/types';
import { SearchType } from '../../state/searchTypes/types';
import { RoverSearchState } from '../../state/types';

export const getSearchType = (state: RoverSearchState): SearchType => state.search.searchType;
export const getInputs = (state: RoverSearchState): SearchInputs => state.search.inputs;
export const getLatLong = (state: RoverSearchState): [number, number] => [
  state.search.latitude,
  state.search.longitude,
];
