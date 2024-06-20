import { useFormFieldSet, util, usePersistFn, useFormFunc } from '@sheinx/hooks';
import React from 'react';
import { FormFieldSetProps } from './form-fieldset.type';
const { produce } = util;

const FormFieldSet = <T,>(props: FormFieldSetProps<T>) => {
  const { children, empty } = props;
  const { current: context } = React.useRef<{ ids: string[] }>({ ids: [] });

  const formFunc = useFormFunc();

  const getValidateProps = usePersistFn(() => props);
  const { Provider, ProviderValue, error, onChange, name } = useFormFieldSet<T>({
    name: props.name,
    reserveAble: props.reserveAble,
    defaultValue: props.defaultValue,
    rules: props.rules,
    onError: props.onError,
    getValidateProps,
  });
  if (typeof children !== 'function') {
    return <Provider value={ProviderValue}>{children}</Provider>;
  }
  let valueArr = formFunc?.getValue(name) || [];
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
          formFunc?.insertError(name, 0)
        })}
      </React.Fragment>,
    );
  }

  const errorList = (Array.isArray(error) ? error : [error]).filter(Boolean);
  if (context.ids.length !== valueArr.length) {
    context.ids = valueArr.map(() => util.generateUUID());
  }
  const ids = context.ids || [];
  valueArr.forEach((v: any, i: number) => {
    result.push(
      <Provider key={ids[i]} value={{ path: `${ProviderValue.path}[${i}]` }}>
        {children({
          list: valueArr,
          value: v,
          index: i,
          error: errorList,
          onChange: (val: T extends (infer U)[] ? U : never) => {
            const oldValue = formFunc?.getValue(name)
            const newValue = produce(oldValue, (draft) => {
              draft[i] = val;
            }) as T;
            onChange(newValue);
            formFunc?.validateFieldset(`${name}[${i}]`)
          },
          onInsert: (val: T extends (infer U)[] ? U : never) => {
            const oldValue = formFunc?.getValue(name)
            const newValue = produce(oldValue, (draft) => {
              draft.splice(i, 0, val);
            }) as T;
            onChange(newValue);
            context.ids.splice(i, 0, util.generateUUID());
            formFunc?.insertError(name, i)
          },
          onAppend: (val: T extends (infer U)[] ? U : never) => {
            const oldValue = formFunc?.getValue(name)
            const newValue = produce(oldValue, (draft) => {
              draft.splice(i + 1, 0, val);
            }) as T;
            onChange(newValue);
            context.ids.splice(i + 1, 0, util.generateUUID());
            formFunc?.insertError(name, i + 1)
          },
          onRemove: () => {
            const oldValue = formFunc?.getValue(name)
            const newValue = produce(oldValue, (draft) => {
              draft.splice(i, 1);
            }) as T;
            onChange(newValue);
            context.ids.splice(i, 1);
            formFunc?.spliceError(name, i)
          },
        })}
      </Provider>,
    );
  });
  return <>{result}</>;
};

export default FormFieldSet;
