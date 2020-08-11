import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {FieldConfig, Validator} from '@@shared/models/field.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.createControl();
  }

  get value() {
    return this.form.value;
  }

  createControl() {
    const group = this.fb.group({});
    for (let i = 0; i < this.fields.length; i++) {
      const control = this.fb.control(
        this.fields[i]['value'] ? this.fields[i]['value'] : '',
        this.bindValidations(this.fields[i]['validations'] || [])
      );
      group.addControl(this.fields[i]['name'], control);
    }
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach((valid) => {
        switch (valid.name) {
          case 'required':
            validList.push(Validators.required);
            break;
          case 'pattern':
            validList.push(Validators.pattern(valid.options));
            break;
          case 'minlength':
            validList.push(Validators.minLength(valid.options));
            break;
          case 'maxlength':
            validList.push(Validators.maxLength(valid.options));
            break;
          case 'min':
            validList.push(Validators.min(valid.options));
            break;
          case 'max':
            validList.push(Validators.max(valid.options));
            break;
        }
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }
} //end of class
