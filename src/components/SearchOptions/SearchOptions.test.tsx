import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { OptionCategory } from '../../state/searchOptions/types';

import SearchOptions, { SearchOptionsProps } from './SearchOptions';

describe('SearchOptions', () => {
  let props: SearchOptionsProps;
  let rendered: ShallowWrapper<SearchOptionsProps>;

  beforeEach(() => {
    props = {
      searchType: 'overnight-boarding',
      isFetching: false,
      isSearchTypesLoaded: false,
      hasFailed: false,
      optionsByCategoryId: {},
      rankedCategories: [],
      inputs: {},
      fetchSearchOptions: jest.fn().mockName('fetchSearchOptions'),
      onSearchFieldChanged: jest.fn().mockName('onSearchFieldChanged'),
    };
  });

  describe('when mounting after search types have already been loaded', () => {
    beforeEach(() => {
      props = { ...props, isSearchTypesLoaded: true };
      rendered = shallow(<SearchOptions {...props} />);
    });

    it('fetches the search options for the current search type', () => {
      expect(props.fetchSearchOptions).toHaveBeenCalledWith(props.searchType);
    });
  });

  describe('when search types are not yet loaded', () => {
    beforeEach(() => {
      props = { ...props, isSearchTypesLoaded: false };
      rendered = shallow(<SearchOptions {...props} />);
    });

    describe('when search types then load', () => {
      beforeEach(() => {
        rendered.setProps({ isSearchTypesLoaded: true });
      });

      it('fetches the search options for the current search type', () => {
        expect(props.fetchSearchOptions).toHaveBeenCalledWith(props.searchType);
      });
    });
  });

  describe('when fetching', () => {
    beforeEach(() => {
      props = { ...props, isFetching: true };
      rendered = shallow(<SearchOptions {...props} />);
    });

    it('displays a loading spinner', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when fetching failed', () => {
    beforeEach(() => {
      props = { ...props, isFetching: false, hasFailed: true };
      rendered = shallow(<SearchOptions {...props} />);
    });

    it('displays an error message with an option to reload', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when fetching succeeded', () => {
    beforeEach(() => {
      const rankedCategories: OptionCategory[] = [
        {
          categoryId: 'service_details',
          rank: 1,
          displayName: 'Service Details',
        },
        {
          categoryId: 'service_details',
          rank: 2,
          displayName: 'Service Details',
        },
      ];
      props = {
        ...props,
        isSearchTypesLoaded: true,
        isFetching: false,
        hasFailed: false,
        rankedCategories,
      };
      rendered = shallow(<SearchOptions {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });

    describe('when the component updates but the search type remains the same', () => {
      beforeEach(() => {
        (props.fetchSearchOptions as jest.Mock).mockClear();
        rendered.setProps({ searchType: props.searchType });
      });

      it('does not refetch options for the same search type', () => {
        expect(props.fetchSearchOptions).not.toHaveBeenCalled();
      });
    });

    describe('when the search type changes to a new type', () => {
      beforeEach(() => {
        (props.fetchSearchOptions as jest.Mock).mockClear();
        rendered.setProps({ searchType: 'drop-in' });
      });

      it('refetches options for the new search type', () => {
        expect(props.fetchSearchOptions).toHaveBeenCalledWith('drop-in');
      });
    });
  });
});
