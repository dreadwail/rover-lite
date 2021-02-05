export type SearchType =
  | 'overnight-boarding'
  | 'overnight-traveling'
  | 'drop-in'
  | 'doggy-day-care'
  | 'dog-walking';

export type Endpoints = { [T in SearchType]?: string };

export interface SearchTypes {
  readonly isFetching: boolean;
  readonly hasFailed: boolean;
  readonly endpoints: Endpoints;
}
