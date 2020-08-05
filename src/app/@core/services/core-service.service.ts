import { Injectable } from '@angular/core';
import { FieldConfig } from '@@shared/models/field.interface';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor() {}
  mapControl(data: object): FieldConfig {
    let result: FieldConfig;
    let options = [];
    let validations = [];
    if (data['AllValidators'].length > 0) {
      for (let i = 0; i < data['AllValidators'].length; i++) {
        let item = {
          name: data['AllValidators'][i]['validatorName'],
          options: data['AllValidators'][i]['validatorOptions'],
          message: data['AllValidators'][i]['validatorMessage'],
        };
        validations.push(item);
      }
    }
    if (
      data['type'] === 'select' ||
      data['type'] === 'radiobutton' ||
      data['type'] === 'checkbox'
    ) {
      for (let i = 0; i < data['AllOptions'].length; i++) {
        let value = data['AllOptions'][i]['optionName'];
        options.push(value);
      }
      result = {
        type: data['type'],
        label: data['label'],
        name: '' + data['name'],
        options: options,
        validations: validations,
        placeholder: data['placeholder'] ? data['placeholder'] : '',
        value: data['value'] ? data['value'] : '',
      };
      return result;
    }

    result = {
      type: data['type'],
      label: data['label'],
      inputType: data['inputType'],
      name: data['name'],
      placeholder: data['placeholder'] ? data['placeholder'] : '',
      value: data['value'] ? data['value'] : '',
      validations: validations,
    };
    return result;
  }
}
