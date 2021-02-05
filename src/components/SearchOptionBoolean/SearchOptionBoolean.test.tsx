import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { BooleanOption } from '../../state/searchOptions/types';

import SearchOptionBoolean, { SearchOptionBooleanProps } from './SearchOptionBoolean';

describe('SearchOptionBoolean', () => {
  let props: SearchOptionBooleanProps;
  let rendered: ShallowWrapper;

  beforeEach(() => {
    const option: BooleanOption = {
      type: 'boolean',
      required: false,
      label: 'test-label',
      category: {
        categoryId: 'test-category-id',
        rank: 0,
        displayName: 'Test Category',
      },
      rank: 0,
    };
    props = {
      optionKey: 'test-option-key',
      onChange: jest.fn().mockName('onChange'),
      option,
      value: true,
    };
    rendered = shallow(<SearchOptionBoolean {...props} />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  describe('when the option is checked', () => {
    beforeEach(() => {
      rendered.find('input').simulate('change', { target: { checked: true } });
    });

    it('calls the onChange prop with the new value', () => {
      expect(props.onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('when the option is unchecked', () => {
    beforeEach(() => {
      rendered.find('input').simulate('change', { target: { checked: false } });
    });

    it('calls the onChange prop with the new value', () => {
      expect(props.onChange).toHaveBeenCalledWith(false);
    });
  });
});
