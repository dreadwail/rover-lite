import { connect, MapStateToProps } from 'react-redux';

import { debouncedFetchResults } from '../../domains/results/actions';
import { getListings, hasFailed, isFetching, isStale } from '../../domains/results/selectors';
import { MapDispatchToProps } from '../../domains/types';
import { RoverSearchState } from '../../state/types';

import Results, { ResultsProps } from './Results';

export type OwnProps = {};
export type MappedStateProps = Pick<
  ResultsProps,
  'isFetching' | 'hasFailed' | 'isStale' | 'listings'
>;
export type MappedDispatchProps = Pick<ResultsProps, 'fetchResults'>;

export const mapStateToProps: MapStateToProps<
  MappedStateProps,
  OwnProps,
  RoverSearchState
> = state => ({
  isFetching: isFetching(state),
  hasFailed: hasFailed(state),
  isStale: isStale(state),
  listings: getListings(state),
});

export const mapDispatchToProps: MapDispatchToProps<MappedDispatchProps, OwnProps> = dispatch => ({
  fetchResults: async () => {
    await dispatch(debouncedFetchResults());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
