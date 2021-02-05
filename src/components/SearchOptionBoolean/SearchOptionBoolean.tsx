import React, { PureComponent } from 'react';

import { BooleanOption } from '../../state/searchOptions/types';

export interface SearchOptionBooleanProps {
  readonly optionKey: string;
  readonly option: BooleanOption;
  readonly value?: boolean;
  onChange(value: any): void;
}

export default class SearchOptionBoolean extends PureComponent<SearchOptionBooleanProps> {
  public render() {
    const { option, optionKey, value } = this.props;
    const { label } = option;
    return (
      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={!!value}
            onChange={this.handleChange}
            id={optionKey}
          />
          <label className="form-check-label" htmlFor={optionKey}>
            {label}
          </label>
        </div>
      </div>
    );
  }

  private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange(event.target.checked);
  };
}
