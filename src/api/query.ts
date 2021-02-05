const formatDate = (date: Date): string => {
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = `${date.getFullYear()}`;

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

const prepareQueryValue = (value: any) => {
  if (value instanceof Date) {
    return formatDate(value);
  }
  return value;
};

const encodePair = (key: string, value: any) => {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  return `${encodedKey}=${encodedValue}`;
};

interface Pair {
  readonly key: string;
  readonly value: any;
}

const createPair = (key: string, value: any): Pair => ({ key, value });

const flattenPairs = (params: Record<string, any>): Pair[] =>
  Object.keys(params).reduce<Pair[]>((pairs, key) => {
    const value = params[key];
    if (value instanceof Array) {
      const pairsHere = value.map(val => createPair(key, val));
      return [...pairs, ...pairsHere];
    }
    return [...pairs, createPair(key, value)];
  }, []);

export const urlEncodeQuery = (params: Record<string, any>) =>
  flattenPairs(params)
    .map(pair => {
      const preparedValue = prepareQueryValue(pair.value);
      return encodePair(pair.key, preparedValue);
    })
    .join('&');
