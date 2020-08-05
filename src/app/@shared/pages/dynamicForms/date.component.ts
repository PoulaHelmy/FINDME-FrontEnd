import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field.interface';
@Component({
  selector: 'app-date',
  template: `
    <mat-form-field [formGroup]="group" class="w-75">
      <label>{{ field.label }} :</label>
      <input
        matInput
        [matDatepicker]="picker"
        [formControlName]="field.name"
        [placeholder]="field.placeholder"
        [value]="field.value ? field.value : ''"
      />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-hint></mat-hint>
      <ng-container
        *ngFor="let validation of field.validations"
        ngProjectAs="mat-error"
      >
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{
          validation.message
        }}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: [],
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
