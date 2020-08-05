import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';
import { MatchingMainComponent } from './pages/matching-main/matching-main.component';
import { MatchingResolver } from '@@core/guards/resolvers/Matching/matching.resolver';

const routes: Routes = [
  {
    path: '',
    component: MatchingMainComponent,
    resolve: { item: MatchingResolver },
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
export class MatchingRoutingModule {}
