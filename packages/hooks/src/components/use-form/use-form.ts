import * as React from 'react';
import { Provider } from './Provider';
import useLatestObj from '../../common/use-latest-obj';
import { extractEventHandlers, deepRemove, deepSet, deepClone, deepGet } from '../../utils';

import { ProviderProps, FormContext, UseFormProps, UseFormSlotProps } from './use-form.type';
import { HandlerType, ObjectType } from '../../common/type';

type FormContextType = ProviderProps['form'];
const useForm = <T extends ObjectType>(props: UseFormProps<T>) => {
  const {
    value = {} as T,
    onChange,
    defaultValue = {} as T,
    labelWidth,
    labelAlign,
    labelVerticalAlign,
    keepErrorHeight,
    inline,
  } = props;

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
    let newValue: T = deepClone(value);
    ref.current.removeArr.forEach((n) => {
      newValue = deepRemove(value!, n) as T;
    });
    onChange?.(newValue);
  };

  const addRemove = (name: string) => {
    ref.current.removeArr.add(name);
    if (ref.current.removeTimer) {
      clearTimeout(ref.current.removeTimer);
    }
    ref.current.removeTimer = setTimeout(remove);
  };

  const formFunc: FormContextType['formFunc'] = useLatestObj({
    bind: (n: string, df: any, validate: (name: string, v: any, formValue: ObjectType) => void) => {
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
        onChange?.(newValue);
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

    setValue: (
      vals: { [key: string]: any },
      option: { validate?: boolean } = { validate: false },
    ) => {
      let newValue = deepClone(value);
      Object.keys(vals).forEach((key) => {
        newValue = deepSet(newValue, key, vals[key], { clone: true }) as T;
        if (option.validate) {
          ref.current.rules[key]?.(key, vals[key], newValue);
        }
      });
      onChange?.(newValue);
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
      const validates = Object.entries(ref.current.rules).map(([key, f]) => {
        return f(key, deepGet(value, key), value);
      });
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
    onChange?.(getDefaultValue());
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
