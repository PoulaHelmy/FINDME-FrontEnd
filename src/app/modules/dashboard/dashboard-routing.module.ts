import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from '@@shared/pages/not-found/not-found.component';
import {AuthGuard} from '@@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('app/modules/dashboard/user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
    pathMatch: 'full',
    canActivateChild: [AuthGuard],
  },
  {
    path: 'items',
    loadChildren: () =>
      import('app/modules/dashboard/items/items.module').then(
        (m) => m.ItemsModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('app/modules/dashboard/requests/requests.module').then(
        (m) => m.RequestsModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('app/modules/dashboard/account/account.module').then(
        (m) => m.AccountModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'increquests',
    loadChildren: () =>
      import(
        'app/modules/dashboard/incoming-requests/incoming-requests.module'
        ).then((m) => m.IncomingRequestsModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'chats',
    loadChildren: () =>
      import('app/modules/dashboard/chats/chats.module').then(
        (m) => m.ChatsModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'humans',
    loadChildren: () =>
      import('app/modules/dashboard/humans/humans.module').then(
        (m) => m.HumansModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'matching',
    loadChildren: () =>
      import('app/modules/dashboard/matching/matching.module').then(
        (m) => m.MatchingModule
      ),
    canActivateChild: [AuthGuard],
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
export class DashboardRoutingModule {
}
