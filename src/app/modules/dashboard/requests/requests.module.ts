import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { RequestsRoutingModule } from './requests-routing.module';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { UpdateRequestComponent } from './pages/update-request/update-request.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';

@NgModule({
  declarations: [
    CreateRequestComponent,
    UpdateRequestComponent,
    RequestsComponent,
    RequestDetailsComponent,
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class RequestsModule {}
