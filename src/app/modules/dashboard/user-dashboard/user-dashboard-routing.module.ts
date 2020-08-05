import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashMainComponent } from './pages/user-dash-main/user-dash-main.component';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashMainComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
