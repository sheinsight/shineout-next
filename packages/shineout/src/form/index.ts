import IForm from './form';
import IFormItem from './form-item';
import IFormField from './form-field';
import IFormFieldSet from './form-fieldset';
import IFormFlow from './form-flow';
import { useFormRef as useForm, useFormInstance } from '@sheinx/hooks'
import { Button as IButton, Submit as ISubmit, Reset as IRest } from './form-button';

type RefForm = typeof IForm;

const Button = IButton as typeof IButton & { displayName: string };
Button.displayName = 'ShineoutFromButton';

const Submit = ISubmit as typeof ISubmit & { displayName: string };
Submit.displayName = 'ShineoutFromSubmit';

const Reset = IRest as typeof IRest & { displayName: string };
Reset.displayName = 'ShineoutFromReset';

const Item = IFormItem as typeof IFormItem & { displayName: string };
Item.displayName = 'ShineoutForm';

const Field = IFormField as typeof IFormField & { displayName: string };
Field.displayName = 'ShineoutField';

const FieldSet = IFormFieldSet as typeof IFormFieldSet & { displayName: string };
FieldSet.displayName = 'ShineoutFieldSet';

const FormFlow = IFormFlow as typeof IFormFlow & { displayName: string };
FormFlow.displayName = 'ShineoutFormFlow';

export interface FormComponent extends RefForm {
  Item: typeof Item;
  Field: typeof Field;
  FieldSet: typeof FieldSet;
  Button: typeof Button;
  Submit: typeof Submit;
  Reset: typeof Reset;
  Flow: typeof FormFlow;
  useForm: typeof useForm;
  useFormInstance: typeof useFormInstance;
}

const FormComp: FormComponent = IForm as FormComponent;

FormComp.Item = Item;
FormComp.Field = Field;
FormComp.FieldSet = FieldSet;
FormComp.Button = Button;
FormComp.Submit = Submit;
FormComp.Reset = Reset;
FormComp.Flow = FormFlow;
FormComp.useForm = useForm;
FormComp.useFormInstance = useFormInstance;

export default FormComp;
