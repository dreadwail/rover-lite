import { Listing } from '../../state/results/types';
import { RoverSearchState } from '../../state/types';

export const isFetching = (state: RoverSearchState): boolean => state.results.isFetching;
export const hasFailed = (state: RoverSearchState): boolean => state.results.hasFailed;
export const isStale = (state: RoverSearchState): boolean => state.results.isStale;
export const getListings = (state: RoverSearchState): Listing[] => state.results.listings;
