type Method = 'GET' | 'OPTIONS';

const headers: RequestInit['headers'] = {
  Accept: 'application/json',
};

export const request = async <T>(method: Method, url: string): Promise<T> => {
  const requestInit: RequestInit = { method, headers };
  const response = await fetch(url, requestInit);
  return response.json();
};
