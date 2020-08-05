import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@@shared/pages/not-found/not-found.component';

import { AddFaceResolver } from '@@core/guards/resolvers/Persons/add-face.resolver';
import { PersonsCreateComponent } from './pages/persons-create/persons-create.component';
import { PersonsOptionsComponent } from './pages/persons-options/persons-options.component';
import { PersonsQuestionsComponent } from './pages/persons-questions/persons-questions.component';
import { PersonsCreateFacesComponent } from './pages/persons-create-faces/persons-create-faces.component';
import { TestFaceIdentificationComponent } from './pages/test-face-identification/test-face-identification.component';
import { PersonDetailsResolver } from '@@core/guards/resolvers/Persons/person-details.resolver';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { UpdatePersonComponent } from './pages/update-person/update-person.component';
import { PersonUpdateResolver } from '@@core/guards/resolvers/Persons/person-update.resolver';
import { UpdatePersonValuesComponent } from './pages/update-person-values/update-person-values.component';
import { UpdatePersonQuestionsComponent } from './pages/update-person-questions/update-person-questions.component';
import { UpdatePersonFacesComponent } from './pages/update-person-faces/update-person-faces.component';
import { ItemUpdateQuestionsResolver } from '@@core/guards/resolvers/ItemsResolvers/items-upqestions.resolver';
import { PersonsUpdateOtpionsResolver } from '@@core/guards/resolvers/Persons/persons-update-options.resolver';

const routes: Routes = [
  { path: 'persons/create', component: PersonsCreateComponent },
  {
    path: 'persons/options',
    component: PersonsOptionsComponent,
    resolve: { item: AddFaceResolver },
  },
  {
    path: 'persons/:id1/faces/:id2',
    component: PersonsCreateFacesComponent,
  },
  {
    path: 'persons/questions/:id',
    component: PersonsQuestionsComponent,
  },
  {
    path: 'persons/identfy',
    component: TestFaceIdentificationComponent,
  },
  {
    path: 'persons/details',
    component: PersonDetailsComponent,
    resolve: { item: PersonDetailsResolver },
  },
  {
    path: 'persons/update/:id',
    component: UpdatePersonComponent,
    resolve: { item: PersonUpdateResolver },
  },
  {
    path: 'persons/upoptions',
    component: UpdatePersonValuesComponent,
    resolve: { item: PersonsUpdateOtpionsResolver },
  },
  {
    path: 'persons/upfaces/:id1/faces/:id2',
    component: UpdatePersonFacesComponent,
  },
  {
    path: 'upquestions/:id',
    component: UpdatePersonQuestionsComponent,
    resolve: { item: ItemUpdateQuestionsResolver },
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
export class HumansRoutingModule {}
