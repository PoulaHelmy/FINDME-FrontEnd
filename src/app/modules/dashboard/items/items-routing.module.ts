import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ItemsCreateComponent} from './pages/items-create/items-create.component';
import {ItemsOptionsComponent} from './pages/items-options/items-options.component';
import {ItemsListComponent} from './pages/items-list/items-list.component';
import {ItemsUpdateComponent} from './pages/items-update/items-update.component';
import {UpdateOptionsComponent} from './pages/update-options/update-options.component';
import {ItemDetailsComponent} from './pages/item-details/item-details.component';
import {ItemsQuestionsComponent} from './pages/items-questions/items-questions.component';
import {UpadteQuestionsComponent} from './pages/upadte-questions/upadte-questions.component';
import {NotFoundComponent} from '@@shared/pages/not-found/not-found.component';


import {AllInputsResolver} from '@@core/guards/resolvers/allInptus.resolver';
import {AllCategoriesResolver} from '@@core/guards/resolvers/allCats.resolver';
import {ItemUpdateResolver} from '@@core/guards/resolvers/ItemsResolvers/item-update.resolver';
import {ItemUpdateOtpionsResolver} from '@@core/guards/resolvers/ItemsResolvers/items-update-options.resolver';
import {ItemUpdateQuestionsResolver} from '@@core/guards/resolvers/ItemsResolvers/items-upqestions.resolver';
import {ItemDetailsResolver} from '@@core/guards/resolvers/ItemsResolvers/item-details.resolver';
import {TestSearchComponent} from './pages/test-search/test-search.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsListComponent,
  },
  {
    path: 'view/:id',
    component: ItemDetailsComponent,
    resolve: {item: ItemDetailsResolver},
  },
  {
    path: 'show/:id',
    component: ItemDetailsComponent,
    resolve: {item: ItemDetailsResolver},
  },
  {
    path: 'create',
    component: ItemsCreateComponent,
    resolve: {item: AllCategoriesResolver},
  },
  {
    path: 'options',
    component: ItemsOptionsComponent,
    resolve: {item: AllInputsResolver},
  },
  {
    path: 'questions/:id',
    component: ItemsQuestionsComponent,
  },
  {
    path: 'update/:id',
    component: ItemsUpdateComponent,
    resolve: {item: ItemUpdateResolver},
  },
  {
    path: 'upoptions',
    component: UpdateOptionsComponent,
    resolve: {item: ItemUpdateOtpionsResolver},
  },
  {
    path: 'upquestions/:id',
    component: UpadteQuestionsComponent,
    resolve: {item: ItemUpdateQuestionsResolver},
  },
  {
    path: 'test',
    component: TestSearchComponent,
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
export class ItemsRoutingModule {
}
