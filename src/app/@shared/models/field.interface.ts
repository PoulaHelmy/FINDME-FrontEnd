export interface Validator {
  name: string;
  validator?: any;
  message: string;
  options?: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  placeholder?: string;
  value?: any;
  validations?: Validator[];
}
