import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { Listing } from '../../state/results/types';

import Result from './Result';

describe('Result', () => {
  let rendered: ShallowWrapper;

  beforeEach(() => {
    const listing: Listing = {
      thumbnailUrl: 'https://example.com/profile.png',
      rank: 0,
      name: 'Test Name',
      badges: [
        {
          content: 'This sitter is Certified as Awesome.',
          imageUrl: 'https://example.com/badge.png',
          title: 'Certified Awesome',
        },
      ],
      tagline: 'Enthusiastic dog lover in Ballard.',
      neighborhood: 'Ballard',
      city: 'Seattle',
      state: 'WA',
      zip: '98117',
      repeatClientCount: 42,
      reviewCount: 12,
      ratingAverage: 4.8,
      featuredReview: 'This sitter is awesome.',
      currencySymbol: '$',
      price: 42.12,
      priceUnit: 'night',
      webUrl: 'https://www.rover.com/members/not-a-real-profile-just-a-test/',
    };
    rendered = shallow(<Result listing={listing} />);
  });

  it('renders correctly', () => {
    expect(rendered).toMatchSnapshot();
  });
});
