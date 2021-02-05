import React, { PureComponent } from 'react';

import { ChoiceOption } from '../../state/searchOptions/types';

export interface SearchOptionChoiceProps {
  readonly optionKey: string;
  readonly option: ChoiceOption;
  readonly value?: string;
  onChange(value: any): void;
}

export default class SearchOptionChoice extends PureComponent<SearchOptionChoiceProps> {
  public render() {
    const { option, optionKey, value } = this.props;
    const { label, choices } = option;
    const radios = choices.map(choice => {
      const choiceKey = `${optionKey}-${choice.value}`;
      const checked = value === choice.value;

      return (
        <div key={choiceKey} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={optionKey}
            id={choiceKey}
            value={choice.value}
            checked={checked}
            onChange={this.handleChange}
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
        {radios}
      </div>
    );
  }

  private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };
}
