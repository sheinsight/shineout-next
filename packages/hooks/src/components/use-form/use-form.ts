import * as React from 'react';
import { Provider } from './Provider';
import useInputAble from '../../common/use-input-able';
import useLatest from '../../common/use-latest';
import { extractEventHandlers, deepRemove, deepSet, deepClone } from '../../utils';

import { ProviderProps, FormContext, UseFormProps, UseFormSlotProps } from './use-form.type';
import { HandlerType, ObjectType } from '../../common/type';

type FormContextType = ProviderProps['form'];
const useForm = <T extends ObjectType>(props: UseFormProps<T>) => {
  const {
    defaultValue = {} as T,
    control,
    labelWidth,
    labelAlign,
    labelVerticalAlign,
    keepErrorHeight,
    inline,
  } = props;
  const [value = {} as T, onChange] = useInputAble({
    value: props.value,
    defaultValue,
    onChange: props.onChange,
    beforeChange: undefined,
    control,
  });

  const ref = React.useRef<FormContext>({
    defaultValues: {},
    rules: {},
    mounted: false,
    removeArr: new Set<string>(),
    names: new Set<string>(),
    submitLock: false,
  });

  const [errors, setErrors] = React.useState<ObjectType>({});

  // 默认值更新
  React.useEffect(() => {
    ref.current.mounted = true;
  }, []);

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

    setError(n: string, e: Error | undefined) {
      setErrors((prev) => ({ ...prev, [n]: e }));
    },

    clearErrors() {
      setErrors({});
    },
  });

  const validate = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const validates = Object.values(ref.current.rules).map((f) => f());
      Promise.all(validates)
        .then((results) => {
          const error = results.find((n) => n instanceof Error);
          if (error) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(() => {
          resolve(false);
        });
    });
  };

  const handleSubmit = (other: HandlerType) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current.submitLock) {
      return;
    }
    ref.current.submitLock = true;
    setTimeout(() => {
      // 防止连续点击
      ref.current.submitLock = false;
    }, 1000);
    (async () => {
      const pass = await validate();
      if (!pass) {
        return;
      }
      props.onSubmit?.(value ?? ({} as T));
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
    formFunc?.clearErrors?.();
    props.onReset?.();
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
