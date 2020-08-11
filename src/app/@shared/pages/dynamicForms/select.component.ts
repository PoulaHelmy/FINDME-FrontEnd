import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../models/field.interface';

@Component({
  selector: 'app-select',
  template: `
    <mat-form-field [formGroup]="group" class="w-75 ">
      <mat-label>{{ field.label }} :</mat-label>
      <mat-select
        [placeholder]="field.placeholder"
        [formControlName]="field.name"
        [value]="field.value">
        <mat-option *ngFor="let item of field.options" [value]="item">{{item}}</mat-option>
      </mat-select>
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
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
