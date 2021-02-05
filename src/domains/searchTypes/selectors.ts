import { SearchType } from '../../state/searchTypes/types';
import { RoverSearchState } from '../../state/types';

export const getSearchTypes = (state: RoverSearchState): SearchType[] => {
  const endpoints = state.searchTypes.endpoints;
  return Object.keys(endpoints) as SearchType[];
};
export const hasFailed = (state: RoverSearchState): boolean => state.searchTypes.hasFailed;
export const isFetching = (state: RoverSearchState): boolean => state.searchTypes.isFetching;
export const getEndpointUrl = (
  state: RoverSearchState,
  searchType: SearchType
): string | undefined => state.searchTypes.endpoints[searchType];
export const isSearchTypesLoaded = (state: RoverSearchState): boolean =>
  getSearchTypes(state).length > 0;
