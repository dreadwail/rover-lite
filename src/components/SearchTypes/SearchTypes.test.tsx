import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { SearchType } from '../../state/searchTypes/types';

import SearchTypes, { SearchTypesProps } from './SearchTypes';

describe('SearchTypes', () => {
  let props: SearchTypesProps;
  let rendered: ShallowWrapper<SearchTypesProps>;

  beforeEach(() => {
    props = {
      searchType: 'overnight-boarding',
      isFetching: false,
      hasFailed: false,
      searchTypes: [],
      fetchSearchTypes: jest.fn().mockName('fetchSearchTypes'),
      onSearchTypeSelected: jest.fn().mockName('onSearchTypeSelected'),
    };
  });

  describe('when fetching', () => {
    beforeEach(() => {
      props = { ...props, isFetching: true };
      rendered = shallow(<SearchTypes {...props} />);
    });

    it('displays a loading spinner', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when fetching failed', () => {
    beforeEach(() => {
      props = { ...props, isFetching: false, hasFailed: true };
      rendered = shallow(<SearchTypes {...props} />);
    });

    it('displays an error message with an option to reload', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when fetching succeeded', () => {
    beforeEach(() => {
      const searchTypes: SearchType[] = ['overnight-traveling', 'dog-walking'];
      props = { ...props, isFetching: false, hasFailed: false, searchTypes };
      rendered = shallow(<SearchTypes {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });

    describe('when selecting one of the search types', () => {
      beforeEach(() => {
        rendered.find('#service-type').simulate('change', { target: { value: 'dog-walking' } });
      });

      it('indicates the search type has changed', () => {
        expect(props.onSearchTypeSelected).toHaveBeenCalledWith('dog-walking');
      });
    });
  });
});
