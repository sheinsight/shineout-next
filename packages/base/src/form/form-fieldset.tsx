import { useFormFieldSet, util, usePersistFn, useFormFunc } from '@sheinx/hooks';
import React from 'react';
import { FormFieldSetProps } from './form-fieldset.type';
const { produce } = util;

const FormFieldSet = <T,>(props: FormFieldSetProps<T>) => {
  const { children, empty } = props;
  // const { current: context } = React.useRef<{ ids: string[] }>({ ids: [] });

  const formFunc = useFormFunc();

  const validateFieldSet = () => {
    formFunc?.validateFields(props.name, { ignoreChildren: true}).catch((e) => e);
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

  if (valueArr.length === 0 && valueArr && empty) {
    return (
      <React.Fragment key={'empty'}>
        {empty((val: T extends (infer U)[] ? U : never) => {
          const newValue = produce(valueArr, (draft) => {
            draft.push(val);
          }) as T;
          onChange(newValue);
          // context.ids.push(util.generateUUID());
          formFunc?.insertError(name, 0);
        })}
      </React.Fragment>
    );
  }

  const errorList = (Array.isArray(error) ? error : [error]).filter(Boolean);
  // if (context.ids.length !== valueArr.length) {
  //   context.ids = valueArr.map(() => util.generateUUID());
  // }

  return valueArr.map((v: any, i: number) => (
    <Provider
      key={i}
      value={{ path: `${ProviderValue.path}[${i}]`, validateFieldSet }}
    >
      {children({
        list: valueArr,
        value: v,
        index: i,
        error: errorList,
        onChange: (val: T extends (infer U)[] ? U : never, options) => {
          const oldValue = formFunc?.getValue(name);
          const newValue = produce(oldValue, (draft) => {
            draft[i] = val;
          }) as T;
          onChange(newValue);
          formFunc?.validateFieldset(`${name}[${i}]`, { ignoreChildren: options?.validate === false });
        },
        onInsert: (val: T extends (infer U)[] ? U : never) => {
          const oldValue = formFunc?.getValue(name);
          let insertValue = val;
          const valueTemplate = oldValue[i]
          if(insertValue === undefined){
            insertValue = util.clearValue(util.deepClone(valueTemplate));
          }
          const newValue = produce(oldValue, (draft) => {
            draft.splice(i, 0, insertValue);
          }) as T;
          onChange(newValue);
          // context.ids.splice(i, 0, util.generateUUID());
          formFunc?.insertError(name, i);
        },
        onAppend: (val: T extends (infer U)[] ? U : never) => {
          const oldValue = formFunc?.getValue(name);
          let insertValue = val;
          const valueTemplate = oldValue[i]
          if(insertValue === undefined){
            insertValue = util.clearValue(util.deepClone(valueTemplate));
          }
          const newValue = produce(oldValue, (draft) => {
            draft.splice(i + 1, 0, insertValue);
          }) as T;
          onChange(newValue);
          // context.ids.splice(i + 1, 0, util.generateUUID());
          formFunc?.insertError(name, i + 1);
        },
        onRemove: () => {
          const oldValue = formFunc?.getValue(name);
          const newValue = produce(oldValue, (draft) => {
            draft.splice(i, 1);
          }) as T;
          onChange(newValue);
          // context.ids.splice(i, 1);
          formFunc?.spliceError(name, i);
        },
      })}
    </Provider>
  ));
};

export default FormFieldSet;
