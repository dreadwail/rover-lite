import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';

import { DateOption } from '../../state/searchOptions/types';

export interface SearchOptionDateProps {
  readonly optionKey: string;
  readonly option: DateOption;
  readonly value?: Date;
  onChange(value: any): void;
}

export default class SearchOptionDate extends PureComponent<SearchOptionDateProps> {
  public render() {
    const { option, optionKey, value } = this.props;
    const { label } = option;
    return (
      <div className="form-group">
        <label htmlFor={optionKey}>
          <small>{label}</small>
        </label>
        <span className="d-block">
          <DatePicker
            selected={value}
            onChange={this.handleChange}
            id={optionKey}
            minDate={new Date()}
            className="form-control form-control-sm"
          />
        </span>
      </div>
    );
  }

  private readonly handleChange = (date: Date) => {
    const { onChange } = this.props;
    onChange(date);
  };
}
