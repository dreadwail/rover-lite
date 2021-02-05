import { RoverSearchState } from './types';

type Primitive = boolean | number | string;

export type RecursivePartial<ThisLevel> = {
  [Key in keyof ThisLevel]?: ThisLevel[Key] extends Primitive
    ? ThisLevel[Key]
    : RecursivePartial<ThisLevel[Key]>
};

export const createMockState = (
  interestingStateKeys?: RecursivePartial<RoverSearchState>
): RoverSearchState => (interestingStateKeys as unknown) as RoverSearchState;
