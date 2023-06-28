import { useFormFieldSet } from '@sheinx/hooks';
import React from 'react';
import { FormFieldSetProps } from './form-fieldset.type';

const FormFieldSet = <T,>(props: FormFieldSetProps<T>) => {
  const { children } = props;
  const { Provider, ProviderValue, value, error } = useFormFieldSet({
    name: props.name,
    reservable: props.reservable,
    defaultValue: props.defaultValue,
    rules: props.rules,
    onError: props.onError,
  });
  if (typeof children !== 'function') {
    return <Provider value={ProviderValue}>{children}</Provider>;
  }
  let valueArr = (value || []) as any[];
  valueArr = Array.isArray(valueArr) ? valueArr : [valueArr];
  if (valueArr.length === 0 && valueArr) {
    //todo empty
    // result.push(empty(this.handleInsert.bind(this, 0)))
  }

  const result: React.ReactNode[] = [];
  const errorList = (Array.isArray(error) ? error : [error]).filter(Boolean);
  valueArr.forEach((v, i: number) => {
    result.push(
      <Provider key={i} value={{ path: `${ProviderValue.path}[${i}]` }}>
        {children({
          list: valueArr,
          value: v,
          index: i,
          error: errorList,
          // onChange: this.handleChange.bind(this, i),
          // onInsert: this.handleInsert.bind(this, i),
          // onAppend: this.handleInsert.bind(this, i + 1),
          // onRemove: this.handleRemove.bind(this, i),
        })}
      </Provider>,
    );
  });
  return <>{result}</>;
};

export default FormFieldSet;
