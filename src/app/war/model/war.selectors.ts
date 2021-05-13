import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWar from './war.reducer';

export const selectWarState = createFeatureSelector<fromWar.WarState>(
  fromWar.warFeatureKey
);

export const selectMapData = createSelector(
  selectWarState,
  ({ busy, nodes, links }) => ({ busy, nodes, links })
)
