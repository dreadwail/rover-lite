import React, { Component } from 'react';

import { Listing } from '../../state/results/types';
import ReloadableFailure from '../ReloadableFailure';
import Result from '../Result';
import Spinner from '../Spinner';

export interface ResultsProps {
  readonly isFetching: boolean;
  readonly hasFailed: boolean;
  readonly isStale: boolean;
  readonly listings: Listing[];
  fetchResults(): void;
}

export default class Results extends Component<ResultsProps> {
  public componentDidMount() {
    this.fetchResultsIfNecessary();
  }

  public componentDidUpdate() {
    this.fetchResultsIfNecessary();
  }

  public render() {
    const { isFetching, hasFailed, listings } = this.props;

    if (isFetching) {
      return <Spinner isLargeSize={true} />;
    }

    if (hasFailed) {
      return <ReloadableFailure />;
    }

    return (
      <div className="row">
        <div className="col-sm">
          <ul className="list-group list-group-flush">
            {listings.map(listing => (
              <li key={listing.webUrl} className="list-group-item">
                <Result listing={listing} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  private readonly fetchResultsIfNecessary = () => {
    const { fetchResults, isStale, isFetching } = this.props;
    const needsFetch = isStale && !isFetching;
    if (needsFetch) {
      fetchResults();
    }
  };
}
