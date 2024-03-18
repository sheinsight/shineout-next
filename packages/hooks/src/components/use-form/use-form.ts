import * as React from 'react';
import { Provider } from './Provider';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import { getDataAttributeName } from '../../utils/attribute';

const globalKey = '__global__&&@@';
import { current, produce } from '../../utils/immer';
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

const emptyObj = {};

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

  const { current: context } = React.useRef<FormContext>({
    defaultValues: {},
    validateMap: {},
    updateMap: {},
    flowMap: {},
    removeArr: new Set<string>(),
    names: new Set<string>(),
    submitLock: false,
    value: props.value || emptyObj,
    errors: {},
    serverErrors: {},
    lastValue: props.value || emptyObj,
    resetTime: 0,
    mounted: false,
    unmounted: false,
    removeLock: false,
  });

  const update = (name?: string | string[]) => {
    if (!name) {
      Object.keys(context.updateMap).forEach((key) => {
        context.updateMap[key]?.(context.value, context.errors, context.serverErrors);
      });
      Object.keys(context.flowMap).forEach((key) => {
        context.flowMap[key].forEach((update) => {
          update();
        });
      });
    } else {
      const names = isArray(name) ? name : [name];
      names.forEach((key) => {
        context.updateMap[key]?.(context.value, context.errors, context.serverErrors);
        context.flowMap[key]?.forEach((update) => {
          update();
        });
      });
    }
    context.flowMap[globalKey]?.forEach((update) => {
      update();
    });
  };

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

  const onChange = usePersistFn((change: T | ((v: T) => void | T)) => {
    const newValue = typeof change === 'function' ? produce(context.value, change) : change;

    context.value = newValue;
    props.onChange?.(context.value as T);
  });

  const validateFields = usePersistFn((fields?: string | string[], config = {}): Promise<true> => {
    return new Promise((resolve, reject) => {
      const files2 = fields
        ? (isArray(fields) ? fields : [fields]).filter((key) => context.validateMap[key])
        : Object.keys(context.validateMap);
      const validates = files2.map((key) => {
        const validateField = context.validateMap[key];
        return validateField(key, deepGet(context.value, key), context.value, config);
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
    if (!context.removeArr.size) return;
    if (context.unmounted) return;
    onChange((v) => {
      context.removeArr.forEach((n) => {
        deepRemove(v, n);
        context.removeArr.delete(n);
      });
    });
  };

  const addRemove = (name: string) => {
    context.removeArr.add(name);
    if (context.removeTimer) {
      clearTimeout(context.removeTimer);
    }
    context.removeTimer = setTimeout(remove);
  };

  const getValue = usePersistFn((name?: string) => {
    if (name) {
      return deepGet(context.value, name);
    }
    return context.value;
  });

  const setValue = usePersistFn(
    (vals: { [key: string]: any }, option: { validate?: boolean } = { validate: false }) => {
      onChange((draft) => {
        Object.keys(vals).forEach((key) => {
          deepSet(draft, key, vals[key], deepSetOptions);
          if (option.validate) {
            context.validateMap[key]?.(key, vals[key], current(draft));
          }
        });
      });
      const keys = Object.keys(vals);
      keys.forEach((key) => {
        delete context.serverErrors[key];
      });
      update(keys);
    },
  );

  const getErrors = usePersistFn(() => context.errors);
  const clearErrors = usePersistFn(() => {
    const keys = Object.keys(context.errors);
    context.errors = {};
    context.serverErrors = {};
    update(keys);
  });

  const setError = usePersistFn((name: string, e: Error | undefined) => {
    context.errors[name] = e;
    update(name);
  });

  const submit = usePersistFn((withValidate: boolean = true) => {
    if (disabled) return;
    if (context.submitLock) {
      return;
    }
    context.submitLock = true;
    setTimeout(() => {
      // 防止连续点击
      context.submitLock = false;
    }, throttle);
    (async () => {
      if (!withValidate) {
        props.onSubmit?.((context.value as T) ?? ({} as T));
        return;
      }
      const result = await validateFields(undefined, { ignoreBind: true }).catch((e) => e);
      if (result === true) {
        props.onSubmit?.((context.value as T) ?? ({} as T));
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
      Object.keys(context.defaultValues).forEach((key) => {
        const df = context.defaultValues[key];
        if (deepGet(draft, key) === undefined) deepSet(draft, key, df, deepSetOptions);
      });
    });
    return v as T;
  };

  const handleReset = (other: HandlerType) => (e: React.FormEventHandler<HTMLFormElement>) => {
    if (disabled) return;
    onChange(getDefaultValue());
    clearErrors();
    update();
    context.resetTime = 1;
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
      updateFn: (
        formValue: ObjectType,
        errors: ObjectType<Error>,
        serverErrors: ObjectType<Error>,
      ) => void,
    ) => {
      if (context.names.has(n)) {
        console.error(`name "${n}" already exist`);
        return;
      }
      context.names.add(n);
      context.validateMap[n] = validate;
      context.updateMap[n] = updateFn;
      context.removeArr.delete(n);
      if (df !== undefined && deepGet(context.value, n) === undefined) {
        if (!context.mounted) context.defaultValues[n] = df;
        onChange((v) => {
          deepSet(v, n, df, deepSetOptions);
        });
      }
      update(n);
    },
    unbind: (n: string, reserveAble?: boolean) => {
      delete context.validateMap[n];
      delete context.defaultValues[n];
      delete context.updateMap[n];
      context.names.delete(n);
      if (!reserveAble && !context.removeLock) {
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
    watch: (names: string[] = [globalKey], update: () => void) => {
      names.forEach((name) => {
        context.flowMap[name] = context.flowMap[name] || new Set();
        context.flowMap[name].add(update);
      });
    },
    unWatch: (names: string[] = [globalKey], update?: () => void) => {
      names.forEach((name) => {
        if (update) {
          context.flowMap[name].delete(update);
        } else {
          delete context.flowMap[name];
        }
      });
    },
  });

  const formValue: FormContextType = React.useMemo(
    () => ({
      func: controlFunc,
      disabled: !!disabled,
    }),
    [!!disabled],
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
    // 服务端错误更新
    if (!props.error) context.serverErrors = {};
    else {
      const errors = Object.keys(props.error).reduce((prev, cur) => {
        const item = props.error![cur];
        const error = item instanceof Error ? item : new Error(item);
        return {
          ...prev,
          [cur]: error,
        };
      }, {});
      context.serverErrors = errors;
    }
    update();
  }, [props.error]);

  // 默认值更新
  React.useEffect(() => {
    context.removeLock = false;
    if (props.value === context.lastValue) return;
    context.value = (props.value || emptyObj) as T;
    if (initValidate && !context.resetTime) {
      const keys = Object.keys(context.validateMap).filter((key) => {
        const oldValue = deepGet(context.lastValue || emptyObj, key);
        const newValue = deepGet(context.value || emptyObj, key);
        return !shallowEqual(oldValue, newValue);
      });
      validateFields(keys).catch(() => {});
    }
    update();
    context.lastValue = props.value;
    context.resetTime = 0;
  }, [props.value]);

  React.useEffect(() => {
    context.mounted = true;
    context.unmounted = false;
    return () => {
      context.mounted = false;
      context.unmounted = true;
    };
  }, []);
  if (props.value !== context.lastValue) {
    context.removeLock = true;
  }

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
