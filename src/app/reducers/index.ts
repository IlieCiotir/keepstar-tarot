import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export const tarotStateFeatureKey = 'tarotState';

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State | undefined, action: any): any => {
    const result = reducer(state, action) as State;
    console.groupCollapsed(action.type);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
