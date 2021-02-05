export interface OptionCategory {
  readonly categoryId: string;
  readonly rank: number;
  readonly displayName: string;
}

export interface BasicOption {
  readonly type: string;
  readonly required: boolean;
  readonly label: string;
  readonly category: OptionCategory;
  readonly rank: number;
  readonly helpText?: string;
}

export interface DateOption extends BasicOption {
  readonly type: 'date';
}

export interface Choice {
  readonly value: any;
  readonly displayName: string;
}

export interface ChoiceOption extends BasicOption {
  readonly type: 'choice';
  readonly choices: Choice[];
}

export interface MultipleChoiceOption extends BasicOption {
  readonly type: 'multiple choice';
  readonly choices: Choice[];
}

export interface IntegerOption extends BasicOption {
  readonly type: 'integer';
  readonly minValue: number;
  readonly maxValue: number;
}

export interface BooleanOption extends BasicOption {
  readonly type: 'boolean';
}

export type Option =
  | BasicOption
  | DateOption
  | ChoiceOption
  | MultipleChoiceOption
  | IntegerOption
  | BooleanOption;

export const isBooleanOption = (option: Option): option is BooleanOption =>
  option.type === 'boolean';
export const isIntegerOption = (option: Option): option is IntegerOption =>
  option.type === 'integer';
export const isMultipleChoiceOption = (option: Option): option is MultipleChoiceOption =>
  option.type === 'multiple choice';
export const isChoiceOption = (option: Option): option is ChoiceOption => option.type === 'choice';
export const isDateOption = (option: Option): option is DateOption => option.type === 'date';
export const isBasicOption = (option: Option): option is BasicOption =>
  [isBooleanOption, isIntegerOption, isChoiceOption, isMultipleChoiceOption, isDateOption].every(
    check => !check(option)
  );

export type Options = Record<string, Option>;
export type OptionsByCategoryId = Record<string, Options>;

export interface SearchOptions {
  readonly isFetching: boolean;
  readonly hasFailed: boolean;
  readonly options: Options;
}
