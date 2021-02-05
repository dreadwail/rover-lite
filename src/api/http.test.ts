import { request } from './http';

interface TestPayload {
  readonly alpha: string;
  readonly beta: string;
}

const url = 'https://www.rover.com/api/v3/search/overnight-boarding/';

describe('api', () => {
  let promise: Promise<TestPayload>;

  describe('.request', () => {
    describe('when the http call fails', () => {
      const error = new Error('bang');

      beforeEach(() => {
        jest.spyOn(window, 'fetch').mockImplementation(() => Promise.reject(error));
        promise = request('GET', url);
      });

      it('makes the correct request', async () => {
        try {
          await promise;
        } catch {
          expect(fetch).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
            })
          );
        }
      });

      it('returns a rejecting promise with the error', async () => {
        await expect(promise).rejects.toEqual(error);
      });
    });

    describe('when the http call succeeds but fails to parse json', () => {
      const error = new Error('bang');

      beforeEach(() => {
        const json = jest.fn().mockName('json');
        json.mockImplementation(() => Promise.reject(error));
        const response: Response = ({ json } as any) as Response;

        jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve(response));

        promise = request('GET', url);
      });

      it('makes the correct request', async () => {
        try {
          await promise;
        } catch {
          expect(fetch).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
            })
          );
        }
      });

      it('returns a rejecting promise with the error', async () => {
        await expect(promise).rejects.toEqual(error);
      });
    });

    describe('when the http call succeeds with json', () => {
      const responsePayload: TestPayload = { alpha: 'one', beta: 'two' };

      beforeEach(() => {
        const json = jest.fn().mockName('json');
        json.mockImplementation(() => Promise.resolve(responsePayload));
        const response: Response = ({ json } as any) as Response;

        jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve(response));

        promise = request('GET', url);
      });

      it('makes the correct request', async () => {
        await promise;

        expect(fetch).toHaveBeenCalledWith(
          url,
          expect.objectContaining({
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          })
        );
      });

      it('returns a resolving promise with the response payload', async () => {
        await expect(promise).resolves.toEqual(responsePayload);
      });
    });
  });
});
