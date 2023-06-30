import * as React from 'react';
import { Provider } from './Provider';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import { produce } from 'immer';
import { deepGet, deepRemove, deepSet, extractEventHandlers, shallowEqual } from '../../utils';

import { FormContext, ProviderProps, UseFormProps, UseFormSlotProps } from './use-form.type';
import { HandlerType, ObjectType } from '../../common/type';

type FormContextType = ProviderProps['formValue'];
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
    initValidate,
  } = props;

  const ref = React.useRef<FormContext>({
    defaultValues: {},
    rules: {},
    removeArr: new Set<string>(),
    names: new Set<string>(),
    submitLock: false,
    lastValue: value,
    resetTime: 0,
    mounted: false,
  });

  React.useEffect(() => {
    ref.current.mounted = true;
  }, []);

  const [errors, setErrors] = React.useState<ObjectType>({});

  const validateFields = usePersistFn((fields?: string[], config = {}): Promise<true> => {
    return new Promise((resolve, reject) => {
      const files2 = fields
        ? fields.filter((key) => ref.current.rules[key])
        : Object.keys(ref.current.rules);
      const validates = files2.map((key) => {
        const f = ref.current.rules[key];
        return f(key, deepGet(value, key), value, config);
      });
      Promise.all(validates)
        .then((results) => {
          const error = results.filter((n) => n instanceof Error);
          if (error.length) {
            reject(error);
          } else {
            resolve(true);
          }
        })
        .catch((e: Error) => {
          reject([e]);
        });
    });
  });

  // 默认值更新
  React.useEffect(() => {
    // initValidate 字段改变后自动校验对应的值
    if (initValidate && !ref.current.resetTime) {
      const keys = Object.keys(ref.current.rules).filter((key) => {
        const oldValue = deepGet(ref.current.lastValue || {}, key);
        const newValue = deepGet(value || {}, key);
        return !shallowEqual(oldValue, newValue);
      });
      validateFields(keys).catch(() => {});
    }
    ref.current.resetTime = 0;
    ref.current.lastValue = value;
  }, [value]);

  const remove = () => {
    if (!ref.current.removeArr.size) return;
    let newValue: T = produce(value, (draft) => {
      ref.current.removeArr.forEach((n) => {
        deepRemove(draft, n);
        ref.current.removeArr.delete(n);
      });
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

  const formFunc: FormContextType['formFunc'] = useLatestObj({
    bind: (
      n: string,
      df: any,
      validate: (
        name: string,
        v: any,
        formValue: ObjectType,
        config: { ignoreBind?: boolean },
      ) => void,
    ) => {
      if (ref.current.names.has(n)) {
        console.error(`name "${n}" already exist`);
        return;
      }
      ref.current.names.add(n);
      ref.current.rules[n] = validate;
      ref.current.removeArr.delete(n);
      if (df !== undefined && deepGet(value, n) === undefined) {
        if (!ref.current.mounted) ref.current.defaultValues[n] = df;
        const newValue = produce(value, (draft) => {
          deepSet(draft, n, df, { clone: true });
        });
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

    setValue: (
      vals: { [key: string]: any },
      option: { validate?: boolean } = { validate: false },
    ) => {
      let newValue = value;
      Object.keys(vals).forEach((key) => {
        newValue = produce(newValue, (draft) => {
          deepSet(draft, key, vals[key], { clone: true });
        });
        if (option.validate) {
          ref.current.rules[key]?.(key, vals[key], newValue);
        }
      });

      onChange(newValue);
    },

    setError(n: string, e: Error | undefined) {
      setErrors((prev) => ({ ...prev, [n]: e }));
    },

    clearErrors() {
      setErrors({});
    },

    validateFields,
  });

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
      const pass = (await validateFields(undefined, { ignoreBind: true }).catch((e) => e)) === true;
      if (!pass) {
        return;
      }
      props.onSubmit?.(value ?? ({} as T));
      other?.onSubmit?.(e);
    })();
  };

  const getDefaultValue = () => {
    const v = produce(defaultValue, (draft) => {
      Object.keys(ref.current.defaultValues).forEach((key) => {
        const df = ref.current.defaultValues[key];
        if (deepGet(draft, key) === undefined) deepSet(draft, key, df, { clone: true });
      });
    });
    return v;
  };

  const handleReset = (other: HandlerType) => (e: React.FormEventHandler<HTMLFormElement>) => {
    onChange(getDefaultValue());
    formFunc?.clearErrors?.();
    ref.current.resetTime = 1;
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

  const formValue: FormContextType = React.useMemo(
    () => ({
      errors,
      value,
      formFunc,
    }),
    [errors, value, formFunc],
  );
  const labelValue: ProviderProps['labelValue'] = React.useMemo(
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
      formValue,
      labelValue,
    },
  };
};

export default useForm;
