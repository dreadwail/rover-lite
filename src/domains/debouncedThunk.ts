import { DebounceSettings } from 'lodash';
import debounce from 'lodash.debounce';
import { ActionCreator } from 'redux';

import { GenericThunkAction } from './types';

export type DebouncedAction = <T>(
  action: ActionCreator<GenericThunkAction<T>>,
  time: number,
  options?: DebounceSettings
) => (...actionArgs: any[]) => GenericThunkAction<T>;

const debouncedAction: DebouncedAction = (action, time, options) => {
  const debounced = debounce(
    (dispatch, actionArgs) => dispatch(action(...actionArgs)),
    time,
    options
  );

  return (...actionArgs) => dispatch => debounced(dispatch, actionArgs);
};

export default debouncedAction;
