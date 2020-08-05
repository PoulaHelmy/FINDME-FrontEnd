import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '@@shared/models/field.interface';
import { InputComponent } from '@@shared/pages/dynamicForms/input.component';
import { ButtonComponent } from '@@shared/pages/dynamicForms/button.component';
import { SelectComponent } from '@@shared/pages/dynamicForms/select.component';
import { DateComponent } from '@@shared/pages/dynamicForms/date.component';
import { RadiobuttonComponent } from '@@shared/pages/dynamicForms/radiobutton.component';
import { CheckboxComponent } from '@@shared/pages/dynamicForms/checkbox.component';
@Directive({
  selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  componentMapper = {
    input: InputComponent,
    button: ButtonComponent,
    select: SelectComponent,
    date: DateComponent,
    radiobutton: RadiobuttonComponent,
    checkbox: CheckboxComponent,
  };
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      this.componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
} //end of class
