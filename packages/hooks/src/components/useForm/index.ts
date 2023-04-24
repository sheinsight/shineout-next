import * as React from 'react';

import { FormContext, FormContextType } from '../../logic/useFormControl/formContext';
import { useInputAble } from '../../index';
import { HandlerType, ObjectType } from '../../common/type';
import extractEventHandlers from '../../utils/extractEventHandlers';
import { FormThis, useFormParams, UseFormProps } from './type';
import { deepRemove, deepSet } from '../../utils/object';
import { deepClone } from '../../utils/clone';
import useLatest from '../../common/useLatest';

// 状态维护
// values
// names
// errors

// 封装事件
//提交 校验 重置

const useForm = (params: useFormParams) => {
  const {
    value: valuePo,
    defaultValue = {},
    onChange: onChangePo,
    onSubmit: onSubmitPo,
    onReset: onResetPo,
  } = params;
  const [value = {}, onChange] = useInputAble({
    value: valuePo,
    defaultValue,
    onChange: onChangePo,
  });
  console.log('!!!df', value);
  const ref = React.useRef<FormThis>({
    defaultValues: {},
    rules: {},
    mounted: false,
  });

  const [errors, setErrors] = React.useState<ObjectType>({});

  // 默认值更新
  React.useEffect(() => {
    ref.current.mounted = true;
  }, []);

  const validate = (): Promise<Error[]> => {
    // todo
    return new Promise((resolve) => {
      console.log('校验');
      resolve([]);
    });
  };

  const handleSubmit = (other: HandlerType) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const error: Error[] = await validate();
      if (error.length) {
        return;
      }
      onSubmitPo?.(value ?? {});
      other?.onSubmit?.(e);
    })();
  };

  const getDefaultValue = () => {
    const v = deepClone(defaultValue);
    Object.keys(ref.current.defaultValues).forEach((key) => {
      const df = ref.current.defaultValues[key];
      deepSet(v, key, typeof df !== 'object' ? df : deepClone(df));
    });
    return v;
  };

  const handleReset = (other: HandlerType) => (e: React.FormEventHandler<HTMLFormElement>) => {
    onChange(getDefaultValue());
    setErrors({});
    onResetPo?.();
    other?.onReset?.(e);
  };

  const getFormProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ): UseFormProps<TOther> => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      ...externalEventHandlers,
      onSubmit: handleSubmit(externalEventHandlers),
      onReset: handleReset(externalEventHandlers),
    };
  };

  const formFunc: FormContextType['formFunc'] = useLatest({
    bind: (n: string, df: any, validate: () => void) => {
      console.log('bind');
      ref.current.rules[n] = validate;
      if (df !== undefined) {
        ref.current.defaultValues[n] = df;
        const newValue = deepSet(value, n, df);
        onChange(newValue);
      }
    },
    unbind: (n: string, reserveAble?: boolean) => {
      console.log('unbind');
      delete ref.current.rules[n];
      delete ref.current.defaultValues[n];
      if (!reserveAble) {
        const newValue = deepRemove(value, n);
        onChange(newValue);
      }
    },

    setValue: (n: string, v: any) => {
      const newValue = deepSet(value, n, v);
      onChange(newValue);
    },
  });

  const ProviderValue: FormContextType = {
    errors,
    value,
    formFunc,
  };

  return {
    getFormProps,
    Provider: FormContext.Provider,
    ProviderValue,
  };
};

export default useForm;
