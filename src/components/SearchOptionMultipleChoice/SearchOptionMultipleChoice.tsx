import React, { Component } from 'react';

import { MultipleChoiceOption } from '../../state/searchOptions/types';

export interface SearchOptionMultipleChoiceProps {
  readonly optionKey: string;
  readonly option: MultipleChoiceOption;
  readonly value?: string[];
  onChange(value: any): void;
}

export default class SearchOptionMultipleChoice extends Component<SearchOptionMultipleChoiceProps> {
  public render() {
    const { option, optionKey, value } = this.props;
    const { label, choices } = option;

    const checkboxes = choices.map(choice => {
      const choiceKey = `${optionKey}-${choice.value}`;
      const checked = value ? value.includes(choice.value) : false;

      return (
        <div key={choiceKey} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={e => {
              this.handleChange(choice.value, e);
            }}
            id={optionKey}
          />
          <label className="form-check-label" htmlFor={choiceKey}>
            {choice.displayName}
          </label>
        </div>
      );
    });

    return (
      <div className="form-group">
        <label htmlFor={optionKey}>
          <small>{label}</small>
        </label>
        {checkboxes}
      </div>
    );
  }

  private readonly handleChange = (
    choiceValue: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { onChange, value } = this.props;
    const values = value ? value : [];
    if (event.target.checked) {
      const uniqueValues = [...new Set([...values, choiceValue])];
      onChange(uniqueValues);
    } else {
      const withoutChoiceValue = values.filter(suspect => suspect !== choiceValue);
      onChange(withoutChoiceValue);
    }
  };
}
