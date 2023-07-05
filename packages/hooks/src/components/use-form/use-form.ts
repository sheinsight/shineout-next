import * as React from 'react';
import { Provider } from './Provider';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import useFuncChange from '../../common/use-func-change';
import { current, produce } from 'immer';
import {
  deepGet,
  deepRemove,
  deepSet,
  docScroll,
  extractEventHandlers,
  isArray,
  isObject,
  shallowEqual,
  wrapFormError,
} from '../../utils';

import { FormContext, ProviderProps, UseFormProps, UseFormSlotProps } from './use-form.type';
import { HandlerType, ObjectType } from '../../common/type';
import { FormItemRule } from '../../utils/rule';

type FormContextType = ProviderProps['formValue'];
const useForm = <T extends ObjectType>(props: UseFormProps<T>) => {
  const {
    defaultValue = {} as T,
    labelWidth,
    labelAlign,
    labelVerticalAlign,
    keepErrorHeight,
    inline,
    initValidate,
    disabled,
    onError,
    scrollToError,
    removeUndefined = true,
    rules,
    throttle = 1000,
    size,
  } = props;

  const deepSetOptions = {
    removeUndefined,
    forceSet: true,
  };

  const { value, onChange } = useFuncChange({
    value: props.value || ({} as T),
    onChange: props.onChange,
  });

  const formRef = React.useRef<HTMLFormElement>();

  const handleSubmitError = (err: Error) => {
    onError?.(err);
    if (!props.scrollToError) return;
    const el = formRef.current?.querySelector('.shineout-form-error');
    if (el) {
      el.scrollIntoView();
    }
    if (typeof scrollToError === 'number' && scrollToError !== 0) {
      docScroll.top -= scrollToError;
    }
  };

  const context = React.useRef<FormContext>({
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
    context.current.mounted = true;
  }, []);

  const [errors, setErrors] = React.useState<ObjectType>({});

  const validateFields = usePersistFn((fields?: string | string[], config = {}): Promise<true> => {
    return new Promise((resolve, reject) => {
      const files2 = fields
        ? (isArray(fields) ? fields : [fields]).filter((key) => context.current.rules[key])
        : Object.keys(context.current.rules);
      const validates = files2.map((key) => {
        const f = context.current.rules[key];
        return f(key, deepGet(value, key), value, config);
      });
      Promise.all(validates)
        .then((results) => {
          const error = results.find((n) => n !== true);
          if (error !== undefined) {
            reject(error);
          } else {
            resolve(true);
          }
        })
        .catch((e: Error) => {
          reject(wrapFormError(e));
        });
    });
  });

  // 默认值更新
  React.useEffect(() => {
    // initValidate 字段改变后自动校验对应的值
    if (initValidate && !context.current.resetTime) {
      const keys = Object.keys(context.current.rules).filter((key) => {
        const oldValue = deepGet(context.current.lastValue || {}, key);
        const newValue = deepGet(value || {}, key);
        return !shallowEqual(oldValue, newValue);
      });
      validateFields(keys).catch(() => {});
    }
    context.current.resetTime = 0;
    context.current.lastValue = value;
  }, [value]);

  const remove = () => {
    if (!context.current.removeArr.size) return;
    onChange((v) => {
      context.current.removeArr.forEach((n) => {
        deepRemove(v, n);
        context.current.removeArr.delete(n);
      });
    });
  };

  const addRemove = (name: string) => {
    context.current.removeArr.add(name);
    if (context.current.removeTimer) {
      clearTimeout(context.current.removeTimer);
    }
    context.current.removeTimer = setTimeout(remove);
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
      if (context.current.names.has(n)) {
        console.error(`name "${n}" already exist`);
        return;
      }
      context.current.names.add(n);
      context.current.rules[n] = validate;
      context.current.removeArr.delete(n);
      if (df !== undefined && deepGet(value, n) === undefined) {
        if (!context.current.mounted) context.current.defaultValues[n] = df;
        onChange((v) => {
          deepSet(v, n, df, deepSetOptions);
        });
      }
    },
    unbind: (n: string, reserveAble?: boolean) => {
      delete context.current.rules[n];
      delete context.current.defaultValues[n];
      context.current.names.delete(n);
      if (!reserveAble) {
        addRemove(n);
      }
    },

    setValue: (
      vals: { [key: string]: any },
      option: { validate?: boolean } = { validate: false },
    ) => {
      onChange((draft) => {
        Object.keys(vals).forEach((key) => {
          deepSet(draft, key, vals[key], deepSetOptions);
          if (option.validate) {
            context.current.rules[key]?.(key, vals[key], current(draft));
          }
        });
      });
    },

    setError(n: string, e: Error | undefined) {
      setErrors((prev) => ({ ...prev, [n]: e }));
    },

    clearErrors() {
      setErrors({});
    },

    combineRules<ItemValue>(name: string, propRules: FormItemRule<ItemValue>) {
      let newRules: FormItemRule<ItemValue> = [];
      if (isObject(rules) && name) {
        newRules = (deepGet(rules, name) || []) as FormItemRule<ItemValue>;
      }
      if (isArray(propRules)) {
        newRules = newRules.concat(propRules);
      }
      return newRules;
    },

    validateFields,
  });

  const submit = usePersistFn((withValidate = true) => {
    if (disabled) return;
    if (context.current.submitLock) {
      return;
    }
    context.current.submitLock = true;
    setTimeout(() => {
      // 防止连续点击
      context.current.submitLock = false;
    }, throttle);
    (async () => {
      if (!withValidate) {
        props.onSubmit?.(value ?? ({} as T));
        return;
      }
      const result = await validateFields(undefined, { ignoreBind: true }).catch((e) => e);
      if (result === true) {
        props.onSubmit?.(value ?? ({} as T));
      } else {
        handleSubmitError(result);
        return;
      }
    })();
  });

  const handleSubmit = (other: HandlerType) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
    other?.onSubmit?.(e);
  };

  const getDefaultValue = () => {
    const v = produce(defaultValue, (draft) => {
      Object.keys(context.current.defaultValues).forEach((key) => {
        const df = context.current.defaultValues[key];
        if (deepGet(draft, key) === undefined) deepSet(draft, key, df, deepSetOptions);
      });
    });
    return v;
  };

  const handleReset = (other: HandlerType) => (e: React.FormEventHandler<HTMLFormElement>) => {
    if (disabled) return;
    onChange(getDefaultValue());
    formFunc?.clearErrors?.();
    context.current.resetTime = 1;
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
      ref: formRef,
      disabled: !!disabled,
      onSubmit: handleSubmit(externalEventHandlers),
      onReset: handleReset(externalEventHandlers),
    };
  };

  const formValue: FormContextType = React.useMemo(
    () => ({
      errors,
      value,
      formFunc,
      disabled: !!disabled,
    }),
    [errors, value, formFunc],
  );
  const formConfig: ProviderProps['formConfig'] = React.useMemo(
    () => ({
      labelWidth,
      labelAlign,
      labelVerticalAlign,
      keepErrorHeight,
      inline,
      disabled,
      size,
    }),
    [labelWidth, labelAlign, labelVerticalAlign, keepErrorHeight, inline, disabled, size],
  );

  const getValue = usePersistFn(() => value);
  const reset = usePersistFn(() => handleReset({})(undefined as any));
  const clearValidate = usePersistFn(formFunc.clearErrors);
  const validate = usePersistFn(() => validateFields());
  const validateFieldsFunc = usePersistFn((fields: string | string[]) =>
    validateFields(fields).catch(() => {}),
  );
  const validateFieldsWithError = usePersistFn((fields: string | string[]) =>
    validateFields(fields),
  );
  const func = useLatestObj({
    submit,
    getValue,
    reset,
    clearValidate,
    validate,
    validateFields: validateFieldsFunc,
    validateFieldsWithError,
  });

  return {
    getFormProps,
    Provider: Provider,
    ProviderProps: {
      formValue,
      formConfig,
    },
    func,
  };
};

export default useForm;
