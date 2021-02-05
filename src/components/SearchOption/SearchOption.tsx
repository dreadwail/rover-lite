import React, { PureComponent } from 'react';

import {
  isBooleanOption,
  isChoiceOption,
  isDateOption,
  isIntegerOption,
  isMultipleChoiceOption,
  Option,
} from '../../state/searchOptions/types';
import SearchOptionBoolean from '../SearchOptionBoolean';
import SearchOptionChoice from '../SearchOptionChoice';
import SearchOptionDate from '../SearchOptionDate';
import SearchOptionInteger from '../SearchOptionInteger';
import SearchOptionMultipleChoice from '../SearchOptionMultipleChoice';

export interface SearchOptionProps {
  readonly optionKey: string;
  readonly option: Option;
  readonly value?: any;
  onChange(value: any): void;
}

export default class SearchOption extends PureComponent<SearchOptionProps> {
  public render() {
    const { optionKey, option, value, onChange } = this.props;
    if (isDateOption(option)) {
      return (
        <SearchOptionDate optionKey={optionKey} option={option} value={value} onChange={onChange} />
      );
    }
    if (isIntegerOption(option)) {
      return (
        <SearchOptionInteger
          optionKey={optionKey}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (isBooleanOption(option)) {
      return (
        <SearchOptionBoolean
          optionKey={optionKey}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (isMultipleChoiceOption(option)) {
      return (
        <SearchOptionMultipleChoice
          optionKey={optionKey}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (isChoiceOption(option)) {
      return (
        <SearchOptionChoice
          optionKey={optionKey}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    }
    return null;
  }
}
