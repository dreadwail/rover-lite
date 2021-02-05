import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import DatePicker from 'react-datepicker';

import { DateOption } from '../../state/searchOptions/types';

import SearchOptionDate, { SearchOptionDateProps } from './SearchOptionDate';

describe('SearchOptionDate', () => {
  let props: SearchOptionDateProps;
  let rendered: ShallowWrapper;

  const initialDate = new Date(1970, 0, 1);
  const now = new Date('2018-05-01T12:00:00');
  const dateToUpdateWith = new Date(1984, 0, 1);

  beforeEach(() => {
    global.Date = class extends Date {
      constructor() {
        super(now.getTime());
      }
    } as any;

    const option: DateOption = {
      type: 'date',
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
      value: initialDate,
    };
    rendered = shallow(<SearchOptionDate {...props} />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  describe('when the date changes', () => {
    beforeEach(() => {
      const picker = rendered.find(DatePicker);
      const onChange = picker.prop('onChange');
      onChange(dateToUpdateWith, {} as any);
    });

    it('calls the onChange prop with the new value', () => {
      expect(props.onChange).toHaveBeenCalledWith(dateToUpdateWith);
    });
  });
});
