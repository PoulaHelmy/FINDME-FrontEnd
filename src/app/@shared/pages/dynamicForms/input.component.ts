import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field.interface';
@Component({
  selector: 'app-input',
  template: `
    <mat-form-field appearance="outline" [formGroup]="group" class="w-75">
      <mat-label>{{ field.label }}</mat-label>
      <input
        matInput
        [formControlName]="field.name"
        [placeholder]="field.placeholder"
        [type]="field.inputType"
        [value]="field.value ? field.value : ''"
      />
      <mat-icon matSuffix *ngIf="!group.get(field.name).errors"
        >sentiment_very_satisfied</mat-icon
      >
      <mat-icon matSuffix *ngIf="group.get(field.name).errors"
        >sentiment_dissatisfied</mat-icon
      >
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
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
