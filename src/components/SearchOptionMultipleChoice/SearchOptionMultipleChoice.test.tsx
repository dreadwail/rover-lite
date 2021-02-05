import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { MultipleChoiceOption } from '../../state/searchOptions/types';

import SearchOptionMultipleChoice, {
  SearchOptionMultipleChoiceProps,
} from './SearchOptionMultipleChoice';

describe('SearchOptionMultipleChoice', () => {
  let props: SearchOptionMultipleChoiceProps;
  let rendered: ShallowWrapper;

  beforeEach(() => {
    const option: MultipleChoiceOption = {
      type: 'multiple choice',
      choices: [
        { value: 'test-choice-1', displayName: 'Test Choice 1' },
        { value: 'test-choice-2', displayName: 'Test Choice 2' },
        { value: 'test-choice-3', displayName: 'Test Choice 3' },
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
      value: ['test-choice-1', 'test-choice-2'],
    };
    rendered = shallow(<SearchOptionMultipleChoice {...props} />);
  });

  describe('when there is no value yet', () => {
    beforeEach(() => {
      props = { ...props, value: undefined };
      rendered = shallow(<SearchOptionMultipleChoice {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });

    describe('when a choice is checked', () => {
      beforeEach(() => {
        const inputs = rendered.find('input');
        inputs.last().simulate('change', { target: { checked: true } });
      });

      it('calls the onChange prop with the new values', () => {
        expect(props.onChange).toHaveBeenCalledWith(['test-choice-3']);
      });
    });
  });

  describe('when there is a value', () => {
    beforeEach(() => {
      props = { ...props, value: ['test-choice-1', 'test-choice-2'] };
      rendered = shallow(<SearchOptionMultipleChoice {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when a choice is unchecked', () => {
    beforeEach(() => {
      const inputs = rendered.find('input');
      inputs.first().simulate('change', { target: { checked: false } });
    });

    it('calls the onChange prop with the remaining value', () => {
      expect(props.onChange).toHaveBeenCalledWith(['test-choice-2']);
    });
  });

  describe('when a choice is checked', () => {
    beforeEach(() => {
      const inputs = rendered.find('input');
      inputs.last().simulate('change', { target: { checked: true } });
    });

    it('calls the onChange prop with the new values', () => {
      expect(props.onChange).toHaveBeenCalledWith([
        'test-choice-1',
        'test-choice-2',
        'test-choice-3',
      ]);
    });
  });
});
