import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { IncomingRequestsRoutingModule } from './incoming-requests-routing.module';
import { IncRequestsComponent } from './pages/inc-requests/inc-requests.component';
import { IncRequestsDetailsComponent } from './pages/inc-requests-details/inc-requests-details.component';

@NgModule({
  declarations: [IncRequestsComponent, IncRequestsDetailsComponent],
  imports: [
    CommonModule,
    IncomingRequestsRoutingModule,
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
export class IncomingRequestsModule {}
