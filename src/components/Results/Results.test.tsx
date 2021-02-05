import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { normalize } from '../../domains/results/normalize';
import overnightBoarding from '../../domains/results/__fixtures__/overnight-boarding.json';

import Results, { ResultsProps } from './Results';

describe('Results', () => {
  let props: ResultsProps;
  let rendered: ShallowWrapper<ResultsProps>;

  beforeEach(() => {
    const [first, second] = normalize(overnightBoarding);
    props = {
      isFetching: false,
      hasFailed: false,
      isStale: false,
      listings: [first, second],
      fetchResults: jest.fn().mockName('fetchResults'),
    };
  });

  describe('when fetching', () => {
    beforeEach(() => {
      props = { ...props, isFetching: true };
      rendered = shallow(<Results {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when failed', () => {
    beforeEach(() => {
      props = { ...props, hasFailed: true };
      rendered = shallow(<Results {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('when the results are not stale and not fetching', () => {
    beforeEach(() => {
      props = { ...props, isStale: false, isFetching: false };
      (props.fetchResults as jest.Mock).mockClear();
      rendered = shallow(<Results {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });

    it('does not call fetchResults on mount', () => {
      expect(props.fetchResults).not.toHaveBeenCalled();
    });

    describe('when the results become stale', () => {
      beforeEach(() => {
        (props.fetchResults as jest.Mock).mockClear();
        rendered.setProps({ isStale: true });
      });

      it('calls fetchResults', () => {
        expect(props.fetchResults).toHaveBeenCalled();
      });
    });
  });

  describe('when the results are stale and not fetching', () => {
    beforeEach(() => {
      props = { ...props, isStale: true, isFetching: false };
      (props.fetchResults as jest.Mock).mockClear();
      rendered = shallow(<Results {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });

    it('calls fetchResults on mount', () => {
      expect(props.fetchResults).toHaveBeenCalled();
    });
  });

  describe('when the results are not stale but fetching', () => {
    beforeEach(() => {
      props = { ...props, isStale: false, isFetching: true };
      (props.fetchResults as jest.Mock).mockClear();
      rendered = shallow(<Results {...props} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });

    it('does not call fetchResults on mount', () => {
      expect(props.fetchResults).not.toHaveBeenCalled();
    });
  });
});
