import Slider, { createSliderWithTooltip } from 'rc-slider';
import React, { PureComponent } from 'react';

import { IntegerOption } from '../../state/searchOptions/types';

export const SliderWithTooltip = createSliderWithTooltip(Slider);

export interface SearchOptionIntegerProps {
  readonly optionKey: string;
  readonly option: IntegerOption;
  readonly value?: number;
  onChange(value: any): void;
}

export default class SearchOptionInteger extends PureComponent<SearchOptionIntegerProps> {
  public render() {
    const { option, optionKey, value } = this.props;
    const { label } = option;
    return (
      <div className="form-group">
        <label htmlFor={optionKey}>
          <small>{label}</small>
        </label>
        <SliderWithTooltip step={1} defaultValue={1} value={value} onChange={this.handleChange} />
      </div>
    );
  }

  private readonly handleChange = (value: number) => {
    const { onChange } = this.props;
    onChange(value);
  };
}
