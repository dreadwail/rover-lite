import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { IntegerOption } from '../../state/searchOptions/types';

import SearchOptionInteger, {
  SearchOptionIntegerProps,
  SliderWithTooltip,
} from './SearchOptionInteger';

describe('SearchOptionInteger', () => {
  let props: SearchOptionIntegerProps;
  let rendered: ShallowWrapper;

  beforeEach(() => {
    const option: IntegerOption = {
      type: 'integer',
      minValue: 0,
      maxValue: 50,
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
      value: 42,
    };
    rendered = shallow(<SearchOptionInteger {...props} />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  describe('when the number changes', () => {
    let newValue: number;

    beforeEach(() => {
      newValue = 34;
      const slider = rendered.find(SliderWithTooltip);
      const onChange = slider.prop<(val: number) => void>('onChange');
      onChange(newValue);
    });

    it('calls the onChange prop with the new value', () => {
      expect(props.onChange).toHaveBeenCalledWith(newValue);
    });
  });
});
