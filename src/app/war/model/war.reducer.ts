import { Action, createReducer, on } from '@ngrx/store';
import * as WarActions from './war.actions';

export const warFeatureKey = 'war';

export interface WarState {
  busy: boolean;
  nodes: WarActions.Node[];
  links: WarActions.Link[];
}

export const initialState: WarState = {
  busy: false,
  nodes: [],
  links: []
};


export const reducer = createReducer(
  initialState,

  on(WarActions.loadWars, state => ({ ...state, busy: true })),
  on(WarActions.loadWarsSuccess, (state, action) => ({ ...state, busy: false, nodes: action.nodes, links: action.links })),
  on(WarActions.loadWarsFailed, (state) => ({ ...state, busy: false }))
);

