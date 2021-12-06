import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { ResaComponent } from './components/resa/resa.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'client', component: ClientComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'reservation', component: ResaComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
