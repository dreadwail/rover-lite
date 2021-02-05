import { Options, OptionsByCategoryId, OptionCategory } from '../../state/searchOptions/types';
import { RoverSearchState } from '../../state/types';

export const hasFailed = (state: RoverSearchState): boolean => state.searchOptions.hasFailed;
export const isFetching = (state: RoverSearchState): boolean => state.searchOptions.isFetching;

const getOptions = (state: RoverSearchState): Options => state.searchOptions.options;

export const getRankedCategories = (state: RoverSearchState): OptionCategory[] => {
  const options = getOptions(state);
  const categoriesByKey = Object.keys(options).reduce<Record<string, OptionCategory>>(
    (categories, key) => {
      const { category } = options[key];
      return { ...categories, [category.categoryId]: category };
    },
    {}
  );
  return Object.values(categoriesByKey).sort((a, b) => a.rank - b.rank);
};

export const getOptionsByCategoryId = (state: RoverSearchState): OptionsByCategoryId => {
  const options = getOptions(state);
  return Object.keys(options).reduce<OptionsByCategoryId>((byCategoryId, key) => {
    const option = options[key];
    const { category } = option;
    const optionsHere = byCategoryId[category.categoryId];
    const newOptionsHere = { ...optionsHere, [key]: option };
    return {
      ...byCategoryId,
      [category.categoryId]: newOptionsHere,
    };
  }, {});
};
