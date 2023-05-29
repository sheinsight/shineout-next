import IForm from './form';
import IFormItem from './form-item';

type RefForm = typeof IForm;
export interface FormComponent extends RefForm {
  Item: typeof IFormItem;
}

const FormComp: FormComponent = IForm as FormComponent;

FormComp.Item = IFormItem;

export default FormComp;
