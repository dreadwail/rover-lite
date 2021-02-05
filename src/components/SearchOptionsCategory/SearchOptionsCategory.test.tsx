import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import SearchOptionsCategory, {
  SearchOptionsCategoryProps,
  SearchOptionsCategoryState,
} from './SearchOptionsCategory';

describe('SearchOptionsCategory', () => {
  let props: SearchOptionsCategoryProps;
  let rendered: ShallowWrapper<SearchOptionsCategoryProps, SearchOptionsCategoryState>;

  beforeEach(() => {
    props = {
      categoryId: 'test-category-id',
      displayName: 'Test Category',
    };
  });

  describe('for the detail category', () => {
    beforeEach(() => {
      props = {
        categoryId: 'detail',
        displayName: 'Detail',
      };
      rendered = shallow(<SearchOptionsCategory {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('for a non-detail category', () => {
    beforeEach(() => {
      props = {
        categoryId: 'test-category-id',
        displayName: 'Test Category',
      };
      rendered = shallow(<SearchOptionsCategory {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when collapsed', () => {
    beforeEach(() => {
      rendered = shallow(<SearchOptionsCategory {...props} />);
      rendered.setState({ isExpanded: false });
    });

    describe('when clicking to expand', () => {
      beforeEach(() => {
        rendered.find('button').simulate('click');
      });

      it('expands the category', () => {
        expect(rendered).toMatchSnapshot();
      });
    });
  });

  describe('when expanded', () => {
    beforeEach(() => {
      rendered = shallow(<SearchOptionsCategory {...props} />);
      rendered.setState({ isExpanded: true });
    });

    describe('when clicking to collapse', () => {
      beforeEach(() => {
        rendered.find('button').simulate('click');
      });

      it('collapses the category', () => {
        expect(rendered).toMatchSnapshot();
      });
    });
  });
});
