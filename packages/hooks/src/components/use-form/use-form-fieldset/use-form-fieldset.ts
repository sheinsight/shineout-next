import FieldsetContext, { useFieldSetConsumer } from './fieldset-context';
import { BaseFormFieldSetProps } from './use-form-fieldset.type';
import { useFormControl } from '../use-form-control';

const emptyFunc = () => {};
export const useFormFieldSet = <T>(props: BaseFormFieldSetProps<T>) => {
  const { name, bind } = useFieldSetConsumer({
    name: props.name,
  });

  const { inForm, error, value, onChange } = useFormControl({
    name,
    defaultValue: props.defaultValue,
    reservable: props.reservable,
    rules: props.rules,
    onError: props.onError,
    bind,
    onChange: emptyFunc,
  });
  if (!inForm) {
    console.error('[FieldSet] should render in Form');
  }

  const ProviderValue = {
    path: name,
  };

  return {
    Provider: FieldsetContext.Provider,
    ProviderValue,
    error,
    value,
    onChange,
  };
};

export default useFormFieldSet;
