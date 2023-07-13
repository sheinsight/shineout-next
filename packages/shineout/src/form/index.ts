import IForm from './form';
import IFormItem from './form-item';
import IFormField from './form-field';
import IFormFieldSet from './form-fieldset';

type RefForm = typeof IForm;

const Item = IFormItem as typeof IFormItem & { displayName: string };
Item.displayName = 'ShineoutForm';

const Field = IFormField as typeof IFormField & { displayName: string };
Field.displayName = 'ShineoutField';

const FieldSet = IFormFieldSet as typeof IFormFieldSet & { displayName: string };
FieldSet.displayName = 'ShineoutFieldSet';

export interface FormComponent extends RefForm {
  Item: typeof Item;
  Field: typeof Field;
  FieldSet: typeof FieldSet;
}

const FormComp: FormComponent = IForm as FormComponent;

FormComp.Item = Item;
FormComp.Field = Field;
FormComp.FieldSet = FieldSet;

export default FormComp;
