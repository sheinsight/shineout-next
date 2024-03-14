import FieldsetContext from './fieldset-context';
import { BaseFormFieldSetProps } from './use-form-fieldset.type';
import { useFormControl } from '../use-form-control';

const emptyFunc = () => {};
const emptyArr: string[] = [];
export const useFormFieldSet = <T>(props: BaseFormFieldSetProps<T>) => {
  const { inForm, error, value, onChange, name } = useFormControl({
    name: props.name,
    defaultValue: props.defaultValue,
    reserveAble: props.reserveAble,
    rules: props.rules,
    onError: props.onError,
    bind: emptyArr,
    onChange: emptyFunc,
    getValidateProps: props.getValidateProps,
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
