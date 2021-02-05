import { Results } from './results/types';
import { Search } from './search/types';
import { SearchOptions } from './searchOptions/types';
import { SearchTypes } from './searchTypes/types';

export interface RoverSearchState {
  readonly searchTypes: SearchTypes;
  readonly searchOptions: SearchOptions;
  readonly search: Search;
  readonly results: Results;
}
