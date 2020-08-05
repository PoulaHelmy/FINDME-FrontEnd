import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { AccountUpdateComponent } from './pages/account-update/account-update.component';
import { UserDetailsResolver } from '@@core/guards/resolvers/UserAuthResolvers/user-details.resolver';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'details',
    pathMatch: 'full',
  },
  {
    path: 'details',
    component: AccountDetailsComponent,
  },
  {
    path: 'update',
    component: AccountUpdateComponent,
    resolve: { item: UserDetailsResolver },
  },
  {
    path: 'changepass',
    component: ChangePasswordComponent,
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
export class AccountRoutingModule {}
