import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Spinner from './Spinner';

describe('Spinner', () => {
  let rendered: ShallowWrapper;

  beforeEach(() => {
    rendered = shallow(<Spinner />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  describe('when large sized', () => {
    beforeEach(() => {
      rendered = shallow(<Spinner isLargeSize={true} />);
    });

    it('renders correctly', () => {
      expect(rendered).toMatchSnapshot();
    });
  });
});
