import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlankLayoutComponent} from '@@shared/layouts/blank-layout/blank-layout.component';
import {NotFoundComponent} from '@@shared/pages/not-found/not-found.component';
import {GuestGuardService} from '@@core/guards/guest.guard';
import {MainNavComponent} from '@@shared/layouts/main-nav/main-nav.component';
import {UserDetailsResolver} from '@@core/guards/resolvers/UserAuthResolvers/user-details.resolver';
import {AuthGuard} from '@@core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: BlankLayoutComponent,
    loadChildren: () =>
      import('./modules/pages-components/pages.module').then(
        (m) => m.PagesModule
      ),
  },
  {
    path: 'dashboard',
    component: MainNavComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('app/modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
    resolve: {item: UserDetailsResolver},
    canActivateChild: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('app/@auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [GuestGuardService],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
