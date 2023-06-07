import IForm from './form';
import IFormItem from './form-item';
import IFormField from './form-field';

type RefForm = typeof IForm;
export interface FormComponent extends RefForm {
  Item: typeof IFormItem;
  Field: typeof IFormField;
}

const FormComp: FormComponent = IForm as FormComponent;

FormComp.Item = IFormItem;
FormComp.Field = IFormField;

export default FormComp;
