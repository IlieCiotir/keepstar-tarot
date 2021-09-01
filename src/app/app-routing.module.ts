import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureMapComponent } from './war/configure-map/configure-map.component';
import { WarEventsMapComponent } from './war/war-events-map/war-events-map.component';
import { WarEventsComponent } from './war/war-events/war-events.component';

const routes: Routes = [
  { path: 'war-events', component: WarEventsComponent },
  { path: 'configure-events', component: ConfigureMapComponent },
  { path: '**', redirectTo: 'war-events' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
