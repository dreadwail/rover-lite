import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Filters from './Filters';

describe('Filters', () => {
  let rendered: ShallowWrapper;

  beforeEach(() => {
    rendered = shallow(<Filters />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });
});
