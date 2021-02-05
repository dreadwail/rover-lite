import React, { Component } from 'react';

import { SearchType } from '../../state/searchTypes/types';
import ReloadableFailure from '../ReloadableFailure';
import Spinner from '../Spinner';

const searchTypeNames: Record<SearchType, string> = {
  'dog-walking': 'Dog Walking',
  'doggy-day-care': 'Doggy Day Care',
  'drop-in': 'Drop-In Visits',
  'overnight-boarding': 'Dog Boarding',
  'overnight-traveling': 'House Sitting',
};

export interface SearchTypesProps {
  readonly searchType: SearchType;
  readonly isFetching: boolean;
  readonly hasFailed: boolean;
  readonly searchTypes: SearchType[];
  fetchSearchTypes(): void;
  onSearchTypeSelected(searchType: SearchType): void;
}

export default class SearchTypes extends Component<SearchTypesProps> {
  public componentDidMount() {
    const { fetchSearchTypes } = this.props;
    fetchSearchTypes();
  }

  public render() {
    const { searchType, searchTypes, isFetching, hasFailed } = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    if (hasFailed) {
      return <ReloadableFailure />;
    }

    return (
      <div className="form-group">
        <label htmlFor="service-type">Service Type</label>
        <select
          className="form-control"
          id="service-type"
          value={searchType}
          onChange={this.onChange}
        >
          {searchTypes.map(type => (
            <option key={type} value={type}>
              {searchTypeNames[type]}
            </option>
          ))}
        </select>
      </div>
    );
  }

  private readonly onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { onSearchTypeSelected } = this.props;
    const searchType = event.target.value as SearchType;
    onSearchTypeSelected(searchType);
  };
}
