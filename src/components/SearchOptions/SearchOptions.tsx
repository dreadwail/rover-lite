import React, { Component } from 'react';

import { SearchInputs } from '../../state/search/types';
import { OptionsByCategoryId, OptionCategory } from '../../state/searchOptions/types';
import { SearchType } from '../../state/searchTypes/types';
import ReloadableFailure from '../ReloadableFailure';
import SearchOptionsCategory from '../SearchOptionsCategory';
import SearchOptionsSet from '../SearchOptionsSet';
import Spinner from '../Spinner';

export interface SearchOptionsProps {
  readonly searchType: SearchType;
  readonly isFetching: boolean;
  readonly isSearchTypesLoaded: boolean;
  readonly hasFailed: boolean;
  readonly optionsByCategoryId: OptionsByCategoryId;
  readonly rankedCategories: OptionCategory[];
  readonly inputs: SearchInputs;
  fetchSearchOptions(searchType: SearchType): void;
  onSearchFieldChanged(key: string, value: any): void;
}

export default class SearchOptions extends Component<SearchOptionsProps> {
  public componentDidMount() {
    const { isSearchTypesLoaded, searchType, fetchSearchOptions } = this.props;
    if (isSearchTypesLoaded) {
      fetchSearchOptions(searchType);
    }
  }

  public componentDidUpdate(previousProps: SearchOptionsProps) {
    const {
      searchType: oldSearchType,
      isSearchTypesLoaded: oldIsSearchTypesLoaded,
    } = previousProps;
    const { isSearchTypesLoaded, fetchSearchOptions, searchType } = this.props;
    const searchTypesLoaded = oldIsSearchTypesLoaded === false && isSearchTypesLoaded === true;
    const searchTypeChanged = oldSearchType !== searchType;
    const requiresRefetch = searchTypesLoaded || searchTypeChanged;
    if (isSearchTypesLoaded && requiresRefetch) {
      fetchSearchOptions(searchType);
    }
  }

  public render() {
    const {
      rankedCategories,
      isFetching,
      hasFailed,
      optionsByCategoryId,
      inputs,
      onSearchFieldChanged,
    } = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    if (hasFailed) {
      return <ReloadableFailure />;
    }

    return (
      <>
        {rankedCategories.map(category => {
          const options = optionsByCategoryId[category.categoryId];
          return (
            <SearchOptionsCategory key={category.categoryId} {...category}>
              <SearchOptionsSet
                options={options}
                inputs={inputs}
                onSearchFieldChanged={onSearchFieldChanged}
              />
            </SearchOptionsCategory>
          );
        })}
      </>
    );
  }
}
