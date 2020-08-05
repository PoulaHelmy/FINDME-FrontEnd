import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SharedModule } from '@@shared/shared.module';
import { MaterialModule } from '@@shared/material/material.module';
import { DatePipe } from '@angular/common';

import { HumansRoutingModule } from './humans-routing.module';
import { UserMainComponent } from './pages/user-main/user-main.component';
import { PersonsCreateComponent } from './pages/persons-create/persons-create.component';
import { PersonsOptionsComponent } from './pages/persons-options/persons-options.component';
import { PersonsQuestionsComponent } from './pages/persons-questions/persons-questions.component';
import { PersonsCreateFacesComponent } from './pages/persons-create-faces/persons-create-faces.component';
import { TestFaceIdentificationComponent } from './pages/test-face-identification/test-face-identification.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { UpdatePersonComponent } from './pages/update-person/update-person.component';
import { UpdatePersonValuesComponent } from './pages/update-person-values/update-person-values.component';
import { UpdatePersonFacesComponent } from './pages/update-person-faces/update-person-faces.component';
import { UpdatePersonQuestionsComponent } from './pages/update-person-questions/update-person-questions.component';
@NgModule({
  declarations: [
    UserMainComponent,
    PersonsCreateComponent,
    PersonsOptionsComponent,
    PersonsQuestionsComponent,
    PersonsCreateFacesComponent,
    TestFaceIdentificationComponent,
    PersonDetailsComponent,
    UpdatePersonComponent,
    UpdatePersonValuesComponent,
    UpdatePersonFacesComponent,
    UpdatePersonQuestionsComponent,
  ],
  imports: [
    CommonModule,
    HumansRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [UserMainComponent],
  providers: [
    DatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class HumansModule {}
