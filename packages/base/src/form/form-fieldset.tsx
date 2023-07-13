import { useFormFieldSet, util } from '@sheinx/hooks';
import React from 'react';
import { FormFieldSetProps } from './form-fieldset.type';
import { produce } from 'immer';

const FormFieldSet = <T,>(props: FormFieldSetProps<T>) => {
  const { children, empty } = props;
  const { current: context } = React.useRef<{ ids: string[] }>({ ids: [] });
  const { Provider, ProviderValue, value, error, onChange } = useFormFieldSet({
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
  const result: React.ReactNode[] = [];

  if (valueArr.length === 0 && valueArr && empty) {
    result.push(
      <React.Fragment key={'empty'}>
        {empty((val: T extends (infer U)[] ? U : never) => {
          const newValue = produce(valueArr, (draft) => {
            draft.push(val);
          }) as T;
          onChange(newValue);
          context.ids.push(util.generateUUID());
        })}
      </React.Fragment>,
    );
  }

  const errorList = (Array.isArray(error) ? error : [error]).filter(Boolean);
  if (context.ids.length !== valueArr.length) {
    context.ids = valueArr.map(() => util.generateUUID());
  }
  const ids = context.ids || [];
  valueArr.forEach((v, i: number) => {
    result.push(
      <Provider key={ids[i]} value={{ path: `${ProviderValue.path}[${i}]` }}>
        {children({
          list: valueArr,
          value: v,
          index: i,
          error: errorList,
          onChange: (val: T extends (infer U)[] ? U : never) => {
            const newValue = produce(valueArr, (draft) => {
              draft[i] = val;
            }) as T;
            onChange(newValue);
          },
          onInsert: (val: T extends (infer U)[] ? U : never) => {
            const newValue = produce(valueArr, (draft) => {
              draft.splice(i, 0, val);
            }) as T;
            onChange(newValue);
            context.ids.splice(i, 0, util.generateUUID());
          },
          onAppend: (val: T extends (infer U)[] ? U : never) => {
            const newValue = produce(valueArr, (draft) => {
              draft.splice(i + 1, 0, val);
            }) as T;
            onChange(newValue);
            context.ids.splice(i + 1, 0, util.generateUUID());
          },
          onRemove: () => {
            const newValue = produce(valueArr, (draft) => {
              draft.splice(i, 1);
            }) as T;
            onChange(newValue);
            context.ids.splice(i, 1);
          },
        })}
      </Provider>,
    );
  });
  return <>{result}</>;
};

export default FormFieldSet;
