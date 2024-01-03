import * as React from 'react';
import { Provider } from './Provider';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import useFuncChange from '../../common/use-func-change';
import { getDataAttributeName } from '../../utils/attribute';

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
    scrollParent,
  } = props;

  const deepSetOptions = {
    removeUndefined,
    forceSet: true,
  };

  const formRef = React.useRef<HTMLFormElement>();
  const [errors, setErrors] = React.useState<ObjectType>({});
  const [severErrors, setSeverErrors] = React.useState<ObjectType>({}); // 服务端错误

  const { value, onChange } = useFuncChange({
    value: props.value || ({} as T),
    onChange: props.onChange,
  });

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

  const handleSubmitError = (err: Error) => {
    onError?.(err);
    if (!props.scrollToError) return;
    setTimeout(() => {
      const selector = `[${getDataAttributeName('status')}="error"]`;

      const el = formRef.current?.querySelector(selector);
      if (el) {
        el.scrollIntoView();
        const focusableSelectors = 'textarea, input,[tabindex]:not([tabindex="-1"])';
        const focusEl = el.querySelector(focusableSelectors) as HTMLElement;
        if (focusEl && focusEl.focus) focusEl.focus();
      }
      if (typeof scrollToError === 'number' && scrollToError !== 0) {
        const scrollEl = scrollParent?.();
        if (scrollEl) {
          scrollEl.scrollTop -= scrollToError;
        } else {
          docScroll.top -= scrollToError;
        }
      }
    });
  };

  const validateFields = usePersistFn((fields?: string | string[], config = {}): Promise<true> => {
    return new Promise((resolve, reject) => {
      const files2 = fields
        ? (isArray(fields) ? fields : [fields]).filter((key) => context.current.rules[key])
        : Object.keys(context.current.rules);
      const validates = files2.map((key) => {
        const validateField = context.current.rules[key];
        return validateField(key, deepGet(value, key), value, config);
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

  const getValue = usePersistFn(() => value);

  const setValue = usePersistFn(
    (vals: { [key: string]: any }, option: { validate?: boolean } = { validate: false }) => {
      Object.keys(vals).forEach((key) => {
        setSeverErrors((pre) => {
          delete pre[key];
          return pre;
        });
      });
      onChange((draft) => {
        Object.keys(vals).forEach((key) => {
          deepSet(draft, key, vals[key], deepSetOptions);
          if (option.validate) {
            context.current.rules[key]?.(key, vals[key], current(draft));
          }
        });
      });
    },
  );

  const getErrors = usePersistFn(() => errors);
  const clearErrors = usePersistFn(() => {
    setErrors({});
    setSeverErrors({});
  });

  const setError = usePersistFn((name: string, e: Error | undefined) => {
    setErrors((prev) => ({ ...prev, [name]: e }));
  });

  const submit = usePersistFn((withValidate: boolean = true) => {
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
    clearErrors();
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

  const reset = usePersistFn(() => handleReset({})(undefined as any));

  const controlFunc: FormContextType['func'] = useLatestObj({
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
  });

  const formValue: FormContextType = React.useMemo(
    () => ({
      errors,
      serverErrors: severErrors,
      value,
      func: controlFunc,
      disabled: !!disabled,
    }),
    [errors, value, controlFunc, severErrors],
  );

  const formFunc = useLatestObj({
    setValue,
    getValue,
    submit,
    reset,
    setError,
    getErrors,
    clearErrors,
    validateFields,
  });

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

  React.useEffect(() => {
    context.current.mounted = true;
  }, []);

  React.useEffect(() => {
    // 服务端错误更新
    if (!props.error) setSeverErrors({});
    else {
      const errors = Object.keys(props.error).reduce((prev, cur) => {
        const item = props.error![cur];
        const error = item instanceof Error ? item : new Error(item);
        return {
          ...prev,
          [cur]: error,
        };
      }, {});
      setSeverErrors(errors);
    }
  }, [props.error]);

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

  return {
    getFormProps,
    Provider: Provider,
    ProviderProps: {
      formValue,
      formConfig,
      formFunc,
    },
    formFunc,
  };
};

export default useForm;
