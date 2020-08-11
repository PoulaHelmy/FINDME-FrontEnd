import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../models/field.interface';

@Component({
  selector: 'app-radiobutton',
  template: `
    <div [formGroup]="group" class="w-75">
      <label id="example-radio-group-label">{{ field.label }}:</label>
      <mat-radio-group [formControlName]="field.name" [value]="field.value">
        <mat-radio-button
          class="example-radio-button"
          *ngFor="let item of field.options"
          [value]="item">{{ item }}</mat-radio-button>
        <ng-container
          *ngFor="let validation of field.validations"
          ngProjectAs="mat-error"
        >
          <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{
            validation.message
            }}</mat-error>
        </ng-container>
      </mat-radio-group>

    </div>
  `,
  styles: [
      `
      .example-radio-group {
        display: flex;
        flex-direction: column;
        margin: 15px 0;
      }

      .example-radio-button {
        margin: 5px;
      }
    `,
  ],
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
