import { Options } from '../../state/searchOptions/types';

import { normalize } from './normalize';
import overnightBoarding from './__fixtures__/overnight-boarding.json';

describe('normalize', () => {
  let normalized: Options;

  describe('with a real overnight boarding payload', () => {
    beforeEach(() => {
      normalized = normalize(overnightBoarding);
    });

    it('returns the expected normalized values', () => {
      expect(normalized).toMatchSnapshot();
    });
  });
});
