import React, { PureComponent } from 'react';

import { OptionCategory } from '../../state/searchOptions/types';

export interface SearchOptionsCategoryProps {
  readonly categoryId: OptionCategory['categoryId'];
  readonly displayName: OptionCategory['displayName'];
}

export interface SearchOptionsCategoryState {
  readonly isExpanded: boolean;
}

export default class SearchOptionsCategory extends PureComponent<
  SearchOptionsCategoryProps,
  SearchOptionsCategoryState
> {
  constructor(props: SearchOptionsCategoryProps) {
    super(props);

    this.state = { isExpanded: props.categoryId === 'detail' };
  }

  public render() {
    const { displayName, children } = this.props;
    const { isExpanded } = this.state;
    const collapseClassName = isExpanded ? 'collapse.show' : 'collapse';
    const collapseArrow = isExpanded ? '▼' : '▶';
    return (
      <>
        <span className="form-text border-bottom text-secondary mb-2">
          <button
            type="button"
            className="btn btn-link pl-0"
            style={{ textDecoration: 'none' }}
            onClick={this.toggleExpansion}
          >
            <small className="text-muted">{collapseArrow}</small>{' '}
            <span className="text-secondary">{displayName}</span>
          </button>
        </span>
        <div className={collapseClassName}>{children}</div>
      </>
    );
  }

  private readonly toggleExpansion = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };
}
