import { connect, MapStateToProps } from 'react-redux';

import { searchFieldChanged } from '../../domains/search/actions';
import { getInputs, getSearchType } from '../../domains/search/selectors';
import { fetchSearchOptions } from '../../domains/searchOptions/actions';
import {
  getOptionsByCategoryId,
  getRankedCategories,
  hasFailed,
  isFetching,
} from '../../domains/searchOptions/selectors';
import { isSearchTypesLoaded } from '../../domains/searchTypes/selectors';
import { MapDispatchToProps } from '../../domains/types';
import { RoverSearchState } from '../../state/types';

import SearchOptions, { SearchOptionsProps } from './SearchOptions';

export type OwnProps = {};
export type MappedStateProps = Pick<
  SearchOptionsProps,
  | 'searchType'
  | 'isFetching'
  | 'isSearchTypesLoaded'
  | 'hasFailed'
  | 'optionsByCategoryId'
  | 'rankedCategories'
  | 'inputs'
>;
export type MappedDispatchProps = Pick<
  SearchOptionsProps,
  'fetchSearchOptions' | 'onSearchFieldChanged'
>;

export const mapStateToProps: MapStateToProps<
  MappedStateProps,
  OwnProps,
  RoverSearchState
> = state => ({
  searchType: getSearchType(state),
  isFetching: isFetching(state),
  isSearchTypesLoaded: isSearchTypesLoaded(state),
  hasFailed: hasFailed(state),
  optionsByCategoryId: getOptionsByCategoryId(state),
  rankedCategories: getRankedCategories(state),
  inputs: getInputs(state),
});

export const mapDispatchToProps: MapDispatchToProps<MappedDispatchProps, OwnProps> = dispatch => ({
  fetchSearchOptions: async searchType => {
    await dispatch(fetchSearchOptions(searchType));
  },
  onSearchFieldChanged: (key, value) => {
    dispatch(searchFieldChanged(key, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchOptions);
