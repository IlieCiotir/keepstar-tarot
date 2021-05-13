import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarEventsMapComponent } from './war/war-events-map/war-events-map.component';
import { WarEventsComponent } from './war/war-events/war-events.component';

const routes: Routes = [
  { path: 'war-events', component: WarEventsComponent },
  { path: '**', redirectTo: 'war-events' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
