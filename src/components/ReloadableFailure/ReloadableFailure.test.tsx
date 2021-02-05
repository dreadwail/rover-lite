import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import ReloadableFailure from './ReloadableFailure';

describe('ReloadableFailure', () => {
  let rendered: ShallowWrapper;

  beforeEach(() => {
    rendered = shallow(<ReloadableFailure />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  describe('when the button is clicked', () => {
    beforeEach(() => {
      spyOn(window.location, 'reload');
      rendered.find('button').simulate('click');
    });

    it('reloads the page', () => {
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
