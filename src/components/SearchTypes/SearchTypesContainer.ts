import { connect, MapStateToProps } from 'react-redux';

import { searchTypeChanged } from '../../domains/search/actions';
import { getSearchType } from '../../domains/search/selectors';
import { fetchSearchTypes } from '../../domains/searchTypes/actions';
import { getSearchTypes, hasFailed, isFetching } from '../../domains/searchTypes/selectors';
import { MapDispatchToProps } from '../../domains/types';
import { RoverSearchState } from '../../state/types';

import SearchTypes, { SearchTypesProps } from './SearchTypes';

export type OwnProps = {};
export type MappedStateProps = Pick<
  SearchTypesProps,
  'searchType' | 'searchTypes' | 'hasFailed' | 'isFetching'
>;
export type MappedDispatchProps = Pick<
  SearchTypesProps,
  'fetchSearchTypes' | 'onSearchTypeSelected'
>;

export const mapStateToProps: MapStateToProps<
  MappedStateProps,
  OwnProps,
  RoverSearchState
> = state => ({
  searchType: getSearchType(state),
  searchTypes: getSearchTypes(state),
  hasFailed: hasFailed(state),
  isFetching: isFetching(state),
});

export const mapDispatchToProps: MapDispatchToProps<MappedDispatchProps, OwnProps> = dispatch => ({
  fetchSearchTypes: async () => {
    await dispatch(fetchSearchTypes());
  },
  onSearchTypeSelected: async searchType => {
    dispatch(searchTypeChanged(searchType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTypes);
