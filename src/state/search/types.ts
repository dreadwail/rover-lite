import { SearchType } from '../searchTypes/types';

export type SearchInputs = Record<string, any>;

export interface Search {
  readonly searchType: SearchType;
  readonly latitude: number;
  readonly longitude: number;
  readonly inputs: SearchInputs;
}
