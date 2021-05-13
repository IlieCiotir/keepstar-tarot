import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as WarActions from './war.actions';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class WarEffects {


  loadWars$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(WarActions.loadWars),
      switchMap(() => this.http.get<WarActions.MapData>(`/assets/systems/graph.json`)
        .pipe(
          map(({ nodes, links }) => WarActions.loadWarsSuccess({ nodes, links }))
        ))
    );
  });


  constructor(private actions$: Actions, private http: HttpClient) { }

}
