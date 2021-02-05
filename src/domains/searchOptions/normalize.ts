import {
  BasicOption,
  BooleanOption,
  ChoiceOption,
  DateOption,
  IntegerOption,
  MultipleChoiceOption,
  Option,
  Options,
} from '../../state/searchOptions/types';

interface RawBasicOption {
  readonly type: string;
  readonly required: boolean;
  readonly label: string;
  readonly help_text?: string;
  readonly category?: string;
  readonly category_rank?: number;
  readonly category_display_name?: string;
  readonly rank?: number;
}

interface RawDateOption extends RawBasicOption {
  readonly type: 'date';
}

interface RawChoice {
  readonly value: any;
  readonly display_name: string;
}

interface RawChoiceOption extends RawBasicOption {
  readonly type: 'choice';
  readonly choices: RawChoice[];
}

interface RawMultipleChoiceOption extends RawBasicOption {
  readonly type: 'multiple choice';
  readonly choices: RawChoice[];
}

interface RawIntegerOption extends RawBasicOption {
  readonly type: 'integer';
  readonly min_value: number;
  readonly max_value: number;
}

interface RawBooleanOption extends RawBasicOption {
  readonly type: 'boolean';
}

type RawOption =
  | RawBasicOption
  | RawDateOption
  | RawChoiceOption
  | RawMultipleChoiceOption
  | RawIntegerOption
  | RawBooleanOption;

const isRawBooleanOption = (rawOption: RawOption): rawOption is RawBooleanOption =>
  rawOption.type === 'boolean';
const isRawIntegerOption = (rawOption: RawOption): rawOption is RawIntegerOption =>
  rawOption.type === 'integer';
const isRawMultipleChoiceOption = (rawOption: RawOption): rawOption is RawMultipleChoiceOption =>
  rawOption.type === 'multiple choice';
const isRawChoiceOption = (rawOption: RawOption): rawOption is RawChoiceOption =>
  rawOption.type === 'choice';
const isRawDateOption = (rawOption: RawOption): rawOption is RawDateOption =>
  rawOption.type === 'date';

type OptionsResponseActionType = 'GET';

type RawOptions = Record<string, RawOption>;

export interface OptionsResponse {
  readonly name: string;
  readonly description: string;
  readonly renders: string[];
  readonly parses: string[];
  readonly actions: Record<OptionsResponseActionType, RawOptions>;
}

const extractRawCategory = (rawBasicOption: RawBasicOption): Option['category'] => {
  const defaultCategory: Option['category'] = {
    categoryId: 'detail',
    rank: 0,
    displayName: 'Detail',
  };
  if (!rawBasicOption.category) {
    return defaultCategory;
  }
  if (!rawBasicOption.category_display_name) {
    return defaultCategory;
  }
  if (!rawBasicOption.category_rank) {
    return defaultCategory;
  }
  return {
    categoryId: rawBasicOption.category,
    rank: rawBasicOption.category_rank,
    displayName: rawBasicOption.category_display_name,
  };
};

const labelOverrides: Record<string, string> = {
  Minprice: 'Minimum Price',
  Maxprice: 'Maximum Price',
};

const convertOverridableLabel = (rawLabel: string): string => {
  const override = labelOverrides[rawLabel];
  if (override) {
    return override;
  }
  return rawLabel;
};

const rawBasicOptionToOption = (rawBasicOption: RawBasicOption): BasicOption => ({
  type: rawBasicOption.type,
  required: !!rawBasicOption.required,
  label: convertOverridableLabel(rawBasicOption.label),
  helpText: rawBasicOption.help_text,
  rank: rawBasicOption.rank || 0,
  category: extractRawCategory(rawBasicOption),
});

const rawBooleanOptionToOption = (rawBooleanOption: RawBooleanOption): BooleanOption => {
  const option = rawBasicOptionToOption(rawBooleanOption);
  return { ...option, type: 'boolean' };
};

const rawIntegerOptionToOption = (rawIntegerOption: RawIntegerOption): IntegerOption => {
  const option = rawBasicOptionToOption(rawIntegerOption);
  return {
    ...option,
    type: 'integer',
    minValue: rawIntegerOption.min_value,
    maxValue: rawIntegerOption.max_value,
  };
};

const choiceDisplayNameOverrides: Record<string, string> = {
  no_pref: 'No preference',
  no_other_dogs: 'No other dogs',
  other_dogs: 'Other dogs',
  houses: 'Houses',
  apartments: 'Apartments',
};

const convertOverridableChoiceDisplayName = (rawDisplayName: string): string => {
  const override = choiceDisplayNameOverrides[rawDisplayName];
  if (override) {
    return override;
  }
  return rawDisplayName;
};

const rawChoiceOptionToOption = (rawChoiceOption: RawChoiceOption): ChoiceOption => {
  const option = rawBasicOptionToOption(rawChoiceOption);
  return {
    ...option,
    type: 'choice',
    choices: rawChoiceOption.choices.map(choice => ({
      value: choice.value,
      displayName: convertOverridableChoiceDisplayName(choice.display_name),
    })),
  };
};

const rawMultipleChoiceOptionToOption = (
  rawMultipleChoiceOption: RawMultipleChoiceOption
): MultipleChoiceOption => {
  const option = rawBasicOptionToOption(rawMultipleChoiceOption);
  return {
    ...option,
    type: 'multiple choice',
    choices: rawMultipleChoiceOption.choices.map(choice => ({
      value: choice.value,
      displayName: convertOverridableChoiceDisplayName(choice.display_name),
    })),
  };
};

const rawDateOptionToOption = (rawDateOption: RawDateOption): DateOption => {
  const option = rawBasicOptionToOption(rawDateOption);
  return { ...option, type: 'date' };
};

const rawOptionToOption = (rawOption: RawOption): Option => {
  if (isRawBooleanOption(rawOption)) {
    return rawBooleanOptionToOption(rawOption);
  }
  if (isRawIntegerOption(rawOption)) {
    return rawIntegerOptionToOption(rawOption);
  }
  if (isRawMultipleChoiceOption(rawOption)) {
    return rawMultipleChoiceOptionToOption(rawOption);
  }
  if (isRawChoiceOption(rawOption)) {
    return rawChoiceOptionToOption(rawOption);
  }
  if (isRawDateOption(rawOption)) {
    return rawDateOptionToOption(rawOption);
  }
  return rawBasicOptionToOption(rawOption);
};

const keysToSkip: string[] = ['service_type', 'page'];

export const normalize = (response: OptionsResponse): Options => {
  const rawOptions = response.actions.GET;
  return Object.keys(rawOptions).reduce((options, key) => {
    if (keysToSkip.includes(key)) {
      return options;
    }
    const rawOption = rawOptions[key];
    const option = rawOptionToOption(rawOption);
    return { ...options, [key]: option };
  }, {});
};
