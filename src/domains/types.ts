import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { RoverSearchState } from '../state/types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GenericThunkAction<T, S extends RoverSearchState = RoverSearchState> = ThunkAction<
  T,
  S,
  {},
  AnyAction
>;
export type PromiseThunkAction<
  T,
  S extends RoverSearchState = RoverSearchState
> = GenericThunkAction<Promise<T>, S>;

export type MapDispatchToProps<
  TDispatchProps,
  TOwnProps = {},
  TState extends RoverSearchState = RoverSearchState,
  A extends Action = Action
> = <E>(dispatch: ThunkDispatch<TState, E, A>, ownProps: TOwnProps) => TDispatchProps;
