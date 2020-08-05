import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'app/@shared/material/material.module';
import { SharedModule } from '@@shared/shared.module';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsCreateComponent } from './pages/items-create/items-create.component';
import { ItemsUpdateComponent } from './pages/items-update/items-update.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { ItemsOptionsComponent } from './pages/items-options/items-options.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { UpdateOptionsComponent } from './pages/update-options/update-options.component';
import { ItemsQuestionsComponent } from './pages/items-questions/items-questions.component';
import { UpadteQuestionsComponent } from './pages/upadte-questions/upadte-questions.component';
import { TestSearchComponent } from './pages/test-search/test-search.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ItemsCreateComponent,
    ItemsUpdateComponent,
    ItemsListComponent,
    ItemDetailsComponent,
    ItemsOptionsComponent,
    UpdateOptionsComponent,
    ItemsQuestionsComponent,
    UpadteQuestionsComponent,
    TestSearchComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ItemsRoutingModule,
    CarouselModule,
  ],
  exports: [
    ItemsCreateComponent,
    ItemsUpdateComponent,
    ItemsListComponent,
    ItemDetailsComponent,
    ItemsOptionsComponent,
    UpdateOptionsComponent,
    ItemsQuestionsComponent,
    UpadteQuestionsComponent,
  ],
  providers: [
    DatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class ItemsModule {}
