import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { IntegerOption } from '../../state/searchOptions/types';
import SearchOption from '../SearchOption';

import SearchOptionsSet, { SearchOptionsSetProps } from './SearchOptionsSet';

describe('SearchOptionsSet', () => {
  let rendered: ShallowWrapper<SearchOptionsSetProps>;
  let props: SearchOptionsSetProps;

  describe('with no options', () => {
    beforeEach(() => {
      props = {
        options: {},
        inputs: {},
        onSearchFieldChanged: jest.fn().mockName('onSearchFieldChanged'),
      };
      rendered = shallow(<SearchOptionsSet {...props} />);
    });

    it('renders nothing', () => {
      expect(rendered.isEmptyRender()).toBe(true);
    });
  });

  describe('with options', () => {
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
        options: { test_key: option },
        inputs: { test_key: 42 },
        onSearchFieldChanged: jest.fn().mockName('onSearchFieldChanged'),
      };
      rendered = shallow(<SearchOptionsSet {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });

    describe('when an option is changed', () => {
      const newValue: number = 42;

      beforeEach(() => {
        const searchOption = rendered.find(SearchOption);
        const onChange = searchOption.prop('onChange');
        onChange(newValue);
      });

      it('calls the onSearchFieldChanged prop with the key and new value', () => {
        expect(props.onSearchFieldChanged).toHaveBeenCalledWith('test_key', newValue);
      });
    });
  });
});
