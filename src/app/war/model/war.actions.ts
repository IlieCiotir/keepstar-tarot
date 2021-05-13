import { createAction, props } from '@ngrx/store';
export interface MapData {
  nodes: Node[];
  links: Link[];
}
export interface Node {
  id: string;
  name: string;
  constellation: string;
  region: string;
  fx?: number;
  fy?: number;
}

export interface Link {
  id: string;
  source: string;
  sourceName: string;
  destinationId: number;
  targetName: string;
  target: string
}

export const loadWars = createAction(
  '[War] Load Wars'
);

export const loadWarsSuccess = createAction(
  '[War] Load Wars success',
  props<{ nodes: Node[], links: Link[] }>()
);

export const loadWarsFailed = createAction(
  '[War] Load Wars failed',
);



