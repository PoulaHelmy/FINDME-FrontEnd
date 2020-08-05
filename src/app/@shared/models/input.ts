export interface Input {
  id: number;
  name: string;
  label?: string;
  inputType?: string;
  validations?: Validator[];
  created_at: string;
}
export interface Validator {
  name: string;
  validator?: any;
  message: string;
  options?: string;
}
