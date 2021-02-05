import React, { FC } from 'react';

import { SearchInputs } from '../../state/search/types';
import { Options } from '../../state/searchOptions/types';
import SearchOption from '../SearchOption';

export interface SearchOptionsSetProps {
  readonly options: Options;
  readonly inputs: SearchInputs;
  onSearchFieldChanged(key: string, value: any): void;
}

const SearchOptionsSet: FC<SearchOptionsSetProps> = ({ options, inputs, onSearchFieldChanged }) => {
  const keys = Object.keys(options);
  if (keys.length === 0) {
    return null;
  }
  return (
    <>
      {keys.map(optionKey => {
        const option = options[optionKey];
        const value = inputs[optionKey];
        const onChange = (newValue: any) => {
          onSearchFieldChanged(optionKey, newValue);
        };
        return (
          <SearchOption
            key={optionKey}
            optionKey={optionKey}
            option={option}
            value={value}
            onChange={onChange}
          />
        );
      })}
    </>
  );
};

export default SearchOptionsSet;
