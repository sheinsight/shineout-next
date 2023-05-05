import * as React from 'react';
import { Provider } from './Provider';
import { useInputAble } from '../../index';
import useLatest from '../../common/useLatest';
import { extractEventHandlers, deepRemove, deepSet, deepClone } from '../../utils';

import type { ProviderProps, FormThis, useFormParams, UseFormSlotProps } from './useForm.types';
import type { HandlerType, ObjectType } from '../../common/type';

type FormContextType = ProviderProps['form'];
const useForm = <T extends ObjectType>(params: useFormParams<T>) => {
  const {
    defaultValue = {} as T,
    onSubmit: onSubmitPo,
    onReset: onResetPo,
    value: valuePo,
    onChange: onChangePo,
    control,
    labelWidth,
    labelAlign,
    labelVerticalAlign,
    keepErrorHeight,
    inline,
  } = params;
  const [value = {} as T, onChange] = useInputAble({
    value: valuePo,
    defaultValue,
    onChange: onChangePo,
    beforeChange: undefined,
    control,
  });
  const ref = React.useRef<FormThis>({
    defaultValues: {},
    rules: {},
    mounted: false,
    removeArr: new Set<string>(),
    names: new Set<string>(),
  });

  const [errors, setErrors] = React.useState<ObjectType>({});

  // 默认值更新
  React.useEffect(() => {
    ref.current.mounted = true;
  }, []);

  const validate = (): Promise<Error[]> => {
    // todo
    return new Promise((resolve) => {
      console.info('校验');
      resolve([]);
    });
  };

  const remove = () => {
    let newValue = deepClone(value);
    ref.current.removeArr.forEach((n) => {
      newValue = deepRemove(value, n);
    });
    onChange(newValue);
  };

  const addRemove = (name: string) => {
    ref.current.removeArr.add(name);
    if (ref.current.removeTimer) {
      clearTimeout(ref.current.removeTimer);
    }
    ref.current.removeTimer = setTimeout(remove);
  };

  const handleSubmit = (other: HandlerType) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const error: Error[] = await validate();
      if (error.length) {
        return;
      }
      onSubmitPo?.(value ?? ({} as T));
      other?.onSubmit?.(e);
    })();
  };

  const getDefaultValue = () => {
    const v = deepClone(defaultValue);
    Object.keys(ref.current.defaultValues).forEach((key) => {
      const df = ref.current.defaultValues[key];
      deepSet(v, key, deepClone(df));
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
  ): UseFormSlotProps<TOther> => {
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
      if (ref.current.names.has(n)) {
        console.error(`name "${n}" already exist`);
        return;
      }
      ref.current.names.add(n);
      ref.current.rules[n] = validate;
      ref.current.removeArr.delete(n);
      if (df !== undefined) {
        ref.current.defaultValues[n] = df;
        const newValue = deepSet(deepClone(value), n, df, { clone: true }) as T;
        onChange(newValue);
      }
    },
    unbind: (n: string, reserveAble?: boolean) => {
      delete ref.current.rules[n];
      delete ref.current.defaultValues[n];
      ref.current.names.delete(n);
      if (!reserveAble) {
        addRemove(n);
      }
    },

    setValue: (n: string, v: any) => {
      const newValue = deepSet(deepClone(value), n, v, { clone: true }) as T;
      onChange(newValue);
    },
  });

  const form: FormContextType = React.useMemo(
    () => ({
      errors,
      value,
      formFunc,
    }),
    [errors, value, formFunc],
  );
  const label: ProviderProps['label'] = React.useMemo(
    () => ({
      labelWidth,
      labelAlign,
      labelVerticalAlign,
      keepErrorHeight,
      inline,
    }),
    [labelWidth, labelAlign, labelVerticalAlign, keepErrorHeight, inline],
  );

  return {
    getFormProps,
    Provider: Provider,
    ProviderProps: {
      form,
      label,
    },
  };
};

export default useForm;
