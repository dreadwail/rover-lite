import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { ChoiceOption } from '../../state/searchOptions/types';

import SearchOptionChoice, { SearchOptionChoiceProps } from './SearchOptionChoice';

describe('SearchOptionChoice', () => {
  let props: SearchOptionChoiceProps;
  let rendered: ShallowWrapper;

  beforeEach(() => {
    const option: ChoiceOption = {
      type: 'choice',
      choices: [
        { value: 'test-choice-1', displayName: 'Test Choice 1' },
        { value: 'test-choice-2', displayName: 'Test Choice 2' },
      ],
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
      value: 'test-choice-1',
    };
    rendered = shallow(<SearchOptionChoice {...props} />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  describe('when an option is chosen', () => {
    beforeEach(() => {
      const inputs = rendered.find('input');
      inputs.first().simulate('change', { target: { value: 'test-option-2' } });
    });

    it('calls the onChange prop with the new value', () => {
      expect(props.onChange).toHaveBeenCalledWith('test-option-2');
    });
  });
});
