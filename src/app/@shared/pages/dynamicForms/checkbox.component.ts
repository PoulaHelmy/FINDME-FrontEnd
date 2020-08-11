import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../models/field.interface';

@Component({
  selector: 'app-checkbox',
  template: `
    <div [formGroup]="group" class="w-75">
      <label class="example-margin">{{ field.label }}: </label>

      <mat-checkbox
        class="example-margin"
        [formControlName]="field.name"
        *ngFor="let item of field.options"
        [value]="field.value"
      >
        {{ item }}</mat-checkbox
      >
      <ng-container
        *ngFor="let validation of field.validations"
        ngProjectAs="mat-error"
      >
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{
          validation.message
          }}</mat-error>
      </ng-container>
    </div>
  `,
  styles: [
      `
      .example-margin {
        margin: 0 10px;
      }
    `,
  ],
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
