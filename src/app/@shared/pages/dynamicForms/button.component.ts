import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field.interface';
@Component({
  selector: 'app-button',
  template: `
    <div [formGroup]="group">
      <button type="submit" mat-raised-button color="primary">
        {{ field.label }}
      </button>
    </div>
  `,
  styles: ['div:{margin-top:10px}'],
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
