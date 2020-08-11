import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IncRequestsComponent} from './pages/inc-requests/inc-requests.component';
import {IncRequestsDetailsComponent} from './pages/inc-requests-details/inc-requests-details.component';
import {NotFoundComponent} from '@@shared/pages/not-found/not-found.component';
import {RequestDetailsResolver} from '@@core/guards/resolvers/RequestsResolver/request-details.resolver';

const routes: Routes = [
  {path: '', component: IncRequestsComponent},
  {
    path: 'view/:id',
    component: IncRequestsDetailsComponent,
    resolve: {item: RequestDetailsResolver},
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
export class IncomingRequestsRoutingModule {
}
