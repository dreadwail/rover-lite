import { urlEncodeQuery } from './query';

describe('query', () => {
  describe('.urlEncodeQuery', () => {
    let encodedQuery: string;

    describe('when supplied no params', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({});
      });

      it('returns an empty string', () => {
        expect(encodedQuery).toEqual('');
      });
    });

    describe('when supplied params with arrays', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({ stuff: ['one', 'two'] });
      });

      it('returns the correct encoded query', () => {
        expect(encodedQuery).toEqual('stuff=one&stuff=two');
      });
    });

    describe('when supplied params that are single digit date values', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({ stuff: new Date(1984, 7, 1) });
      });

      it('returns the correct encoded query', () => {
        expect(encodedQuery).toEqual('stuff=1984-08-01');
      });
    });

    describe('when supplied params that are double digit date values', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({ stuff: new Date(1984, 11, 20) });
      });

      it('returns the correct encoded query', () => {
        expect(encodedQuery).toEqual('stuff=1984-12-20');
      });
    });

    describe('when supplied params that are string values', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({ alpha: 'one', beta: 'two' });
      });

      it('returns the correct encoded query', () => {
        expect(encodedQuery).toEqual('alpha=one&beta=two');
      });
    });

    describe('when supplied params that are boolean values', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({ alpha: true, beta: false });
      });

      it('returns the correct encoded query', () => {
        expect(encodedQuery).toEqual('alpha=true&beta=false');
      });
    });

    describe('when supplied params that are integer values', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({ alpha: 10, beta: 20 });
      });

      it('returns the correct encoded query', () => {
        expect(encodedQuery).toEqual('alpha=10&beta=20');
      });
    });

    describe('when supplied params that are float values', () => {
      beforeEach(() => {
        encodedQuery = urlEncodeQuery({ alpha: 10.5, beta: -20.5 });
      });

      it('returns the correct encoded query', () => {
        expect(encodedQuery).toEqual('alpha=10.5&beta=-20.5');
      });
    });
  });
});
