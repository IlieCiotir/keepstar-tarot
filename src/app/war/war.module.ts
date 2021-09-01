import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { WarEffects } from './model/war.effects';
import { WarEventsMapComponent } from './war-events-map/war-events-map.component';
import { StoreModule } from '@ngrx/store';
import { reducer, warFeatureKey } from './model/war.reducer';
import { WarEventsComponent } from './war-events/war-events.component';
import { ConfigureMapComponent } from './configure-map/configure-map.component';



@NgModule({
  declarations: [
    WarEventsMapComponent,
    WarEventsComponent,
    ConfigureMapComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(warFeatureKey, reducer),
    EffectsModule.forFeature([WarEffects])
  ],
  exports: [
    WarEventsMapComponent,
    ConfigureMapComponent
  ],
  entryComponents: [
    WarEventsMapComponent
  ]
})
export class WarModule { }
