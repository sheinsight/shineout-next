import { useFormFieldSet, util, usePersistFn, useFormFunc } from '@sheinx/hooks';
import React from 'react';
import { FormFieldSetProps } from './form-fieldset.type';
const { produce } = util;

const FormFieldSet = <T,>(props: FormFieldSetProps<T>) => {
  const { children, empty } = props;
  const { current: context } = React.useRef<{ ids: string[], lastValues: any }>({ ids: [], lastValues: [] });

  const formFunc = useFormFunc();

  const validateFieldSet = () => {
    formFunc?.validateFields(props.name).catch((e) => e);
  };

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
    return <Provider value={{ ...ProviderValue, validateFieldSet }}>{children}</Provider>;
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
          formFunc?.insertError(name, 0);
        })}
      </React.Fragment>,
    );
  }

  const errorList = (Array.isArray(error) ? error : [error]).filter(Boolean);
  if (context.ids.length !== valueArr.length) {
    context.ids = valueArr.map(() => util.generateUUID());
  }

  valueArr.forEach((v: any, i: number) => {
    if(context.lastValues[i] !== v) {
      context.ids[i] = util.generateUUID()
    }
    result.push(
      <Provider key={context.ids[i] ?? i} value={{ path: `${ProviderValue.path}[${i}]`, validateFieldSet }}>
        {children({
          list: valueArr,
          value: v,
          index: i,
          error: errorList,
          onChange: (val: T extends (infer U)[] ? U : never) => {
            const oldValue = formFunc?.getValue(name);
            const newValue = produce(oldValue, (draft) => {
              draft[i] = val;
            }) as T;
            onChange(newValue);
            formFunc?.validateFieldset(`${name}[${i}]`);
          },
          onInsert: (val: T extends (infer U)[] ? U : never) => {
            const oldValue = formFunc?.getValue(name);
            const newValue = produce(oldValue, (draft) => {
              draft.splice(i, 0, val);
            }) as T;
            onChange(newValue);
            context.ids.splice(i, 0, util.generateUUID());
            formFunc?.insertError(name, i);
          },
          onAppend: (val: T extends (infer U)[] ? U : never) => {
            const oldValue = formFunc?.getValue(name);
            const newValue = produce(oldValue, (draft) => {
              draft.splice(i + 1, 0, val);
            }) as T;
            onChange(newValue);
            context.ids.splice(i + 1, 0, util.generateUUID());
            formFunc?.insertError(name, i + 1);
          },
          onRemove: () => {
            const oldValue = formFunc?.getValue(name);
            const newValue = produce(oldValue, (draft) => {
              draft.splice(i, 1);
            }) as T;
            onChange(newValue);
            context.ids.splice(i, 1);
            formFunc?.spliceError(name, i);
          },
        })}
      </Provider>,
    );
  });

  // 更新 lastValues
  context.lastValues = valueArr

  return <>{result}</>;
};

export default FormFieldSet;
