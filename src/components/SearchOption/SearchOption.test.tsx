import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import {
  BasicOption,
  BooleanOption,
  ChoiceOption,
  DateOption,
  IntegerOption,
  MultipleChoiceOption,
} from '../../state/searchOptions/types';

import SearchOption, { SearchOptionProps } from './SearchOption';

describe('SearchOption', () => {
  let props: SearchOptionProps;
  let rendered: ShallowWrapper;

  beforeEach(() => {
    props = {
      optionKey: 'test-option-key',
      onChange: jest.fn().mockName('onChange'),
      option: {
        type: 'unknown',
        required: false,
        label: 'unknown-label',
        category: {
          categoryId: 'unknown-category-id',
          rank: 0,
          displayName: 'Unknown Category Name',
        },
        rank: 0,
      },
    };
  });

  describe('with a date option', () => {
    beforeEach(() => {
      const option: DateOption = {
        type: 'date',
        required: false,
        label: 'test-date-label',
        category: {
          categoryId: 'test-date-category-id',
          rank: 0,
          displayName: 'Test Date Category',
        },
        rank: 0,
      };
      const value = new Date(1970, 0, 1);
      props = { ...props, option, value };
      rendered = shallow(<SearchOption {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with an integer option', () => {
    beforeEach(() => {
      const option: IntegerOption = {
        type: 'integer',
        minValue: 0,
        maxValue: 50,
        required: false,
        label: 'test-integer-label',
        category: {
          categoryId: 'test-integer-category-id',
          rank: 0,
          displayName: 'Test Integer Category',
        },
        rank: 0,
      };
      const value = 42;
      props = { ...props, option, value };
      rendered = shallow(<SearchOption {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with a boolean option', () => {
    beforeEach(() => {
      const option: BooleanOption = {
        type: 'boolean',
        required: false,
        label: 'test-integer-label',
        category: {
          categoryId: 'test-integer-category-id',
          rank: 0,
          displayName: 'Test Integer Category',
        },
        rank: 0,
      };
      const value = true;
      props = { ...props, option, value };
      rendered = shallow(<SearchOption {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with a multiple choice option', () => {
    beforeEach(() => {
      const option: MultipleChoiceOption = {
        type: 'multiple choice',
        choices: [
          { value: 'test-choice-1', displayName: 'Test Choice 1' },
          { value: 'test-choice-2', displayName: 'Test Choice 2' },
        ],
        required: false,
        label: 'test-multiple-choice-label',
        category: {
          categoryId: 'test-multiple-choice-category-id',
          rank: 0,
          displayName: 'Test Multiple Choice Category',
        },
        rank: 0,
      };
      const value = ['test-choice-1', 'test-choice-2'];
      props = { ...props, option, value };
      rendered = shallow(<SearchOption {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with a choice option', () => {
    beforeEach(() => {
      const option: ChoiceOption = {
        type: 'choice',
        choices: [
          { value: 'test-choice-1', displayName: 'Test Choice 1' },
          { value: 'test-choice-2', displayName: 'Test Choice 2' },
        ],
        required: false,
        label: 'test-choice-label',
        category: {
          categoryId: 'test-choice-category-id',
          rank: 0,
          displayName: 'Test Choice Category',
        },
        rank: 0,
      };
      const value = 'test-choice-1';
      props = { ...props, option, value };
      rendered = shallow(<SearchOption {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with an unhandled option', () => {
    beforeEach(() => {
      const option: BasicOption = {
        type: 'nope',
        required: false,
        label: 'test-unknown-label',
        category: {
          categoryId: 'test-unknown-category-id',
          rank: 0,
          displayName: 'Test Unknown Category',
        },
        rank: 0,
      };
      const value = {};
      props = { ...props, option, value };
      rendered = shallow(<SearchOption {...props} />);
    });

    it('renders nothing', () => {
      expect(rendered.isEmptyRender()).toBe(true);
    });
  });
});
