import * as React from 'react';
import { Provider } from './Provider';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import { getDataAttributeName } from '../../utils/attribute';
import { insertValue, spliceValue } from '../../utils/flat';
import { usePrevious } from '../../common/use-default-value';

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
  deepClone,
  getAllKeyPaths,
} from '../../utils';

const emptyObj = {};

import {
  FormContext,
  ProviderProps,
  UseFormProps,
  UseFormSlotProps,
  ValidateFn,
  UpdateFn,
} from './use-form.type';
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
    reserveAble,
    scrollParent,
    value,
  } = props;
  const deepSetOptions = {
    removeUndefined,
    forceSet: true,
  };

  const preValue = usePrevious(props.value);

  const formRef = React.useRef<HTMLFormElement>();

  const { current: context } = React.useRef<FormContext>({
    defaultValues: {},
    validateMap: {},
    updateMap: {},
    flowMap: {},
    removeArr: new Set<string>(),
    names: new Set<string>(),
    submitLock: false,
    value: deepClone(props.value) || emptyObj,
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
        context.updateMap[key]?.forEach((update) => {
          update(context.value, context.errors, context.serverErrors);
        });
      });
      Object.keys(context.flowMap).forEach((key) => {
        context.flowMap[key].forEach((update) => {
          update();
        });
      });
    } else {
      const names = isArray(name) ? name : [name];
      names.forEach((key) => {
        context.updateMap[key]?.forEach((update) => {
          update(context.value, context.errors, context.serverErrors);
        });
        context.flowMap[key]?.forEach((update) => {
          update();
        });
      });
    }
    context.flowMap[globalKey]?.forEach((update) => {
      update();
    });
  };

  const updateFieldsets = usePersistFn((name: string) => {
    const na = `${name}[`;
    const no = `${name}.`;
    context.names.forEach((key) => {
      if (key.startsWith(na) || key.startsWith(no)) {
        update(key);
      }
    });
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

  const onChange = usePersistFn((change: T | ((v: T) => void | T)) => {
    const newValue = typeof change === 'function' ? produce(context.value as T, change) : change;
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
        return Array.from(validateField).map((validate) =>
          validate(key, deepGet(context.value, key), context.value, config),
        );
      });
      Promise.all(validates.flat())
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
    (
      vals: { [key: string]: any },
      option: { validate?: boolean; names?: string[] } = { validate: false },
    ) => {
      onChange((draft) => {
        const values = Object.keys(vals);
        // 针对 name 为数组模式，如 datepicker 的 name={['startTime', 'endTime']} 时，前者校验可能需要依赖后者，因此需要提前将后者数据整合至 draft 用于多字段整合校验
        const nextDraft = Object.assign({}, current(draft), vals);
        values.forEach((key) => {
          deepSet(draft, key, vals[key], deepSetOptions);
          if (option.validate) {
            context.validateMap[key]?.forEach((validate) => {
              validate(key, vals[key], nextDraft);
            });
          }
        });
      });

      // 获取vals的所有key,包括嵌套对象的key
      const fullKeyPaths = getAllKeyPaths(vals);

      fullKeyPaths.forEach((key) => {
        delete context.serverErrors[key];
      });
      update(fullKeyPaths);
    },
  );

  const getErrors = usePersistFn(() => context.errors);
  const clearValidate = usePersistFn((names?: string[]) => {
    const keys = names || Object.keys(context.errors);
    validateFields(keys, { type: 'forcePass' }).then(() => {
      if (!names) {
        context.errors = {};
        context.serverErrors = {};
      } else {
        keys.forEach((key) => {
          delete context.serverErrors[key];
        });
      }
    });
  });

  const setError = usePersistFn((name: string, e: Error | undefined) => {
    context.errors[name] = e;
    update(name);
  });

  const insertError = usePersistFn((name: string, index: number, error?: Error) => {
    insertValue(context.errors, name, index, error);
    updateFieldsets(name);
  });

  const spliceError = usePersistFn((name: string, index: number) => {
    spliceValue(context.errors, name, index);
    updateFieldsets(name);
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
    setTimeout(() => {
      submit();
      other?.onSubmit?.(e);
    }, 10);
  };

  const validateFieldset = (name: string) => {
    const na = `${name}[`;
    const no = `${name}.`;
    const fields: string[] = [];
    context.names.forEach((key) => {
      if (key.startsWith(na) || key.startsWith(no)) {
        fields.push(key);
      }
    });
    validateFields(fields).catch(() => {});
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
    clearValidate();
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
    bind: (n: string, df: any, validate: ValidateFn, updateFn: UpdateFn) => {
      if (context.names.has(n)) {
        console.warn(`name "${n}" already exist`);
      }
      context.names.add(n);

      if (!context.validateMap[n]) {
        context.validateMap[n] = new Set();
      }
      context.validateMap[n].add(validate);

      if (!context.updateMap[n]) {
        context.updateMap[n] = new Set();
      }
      context.updateMap[n].add(updateFn);
      context.removeArr.delete(n);
      if (df !== undefined && deepGet(context.value, n) === undefined) {
        if (!context.mounted) context.defaultValues[n] = df;
        onChange((v) => {
          deepSet(v, n, df, deepSetOptions);
        });
        // setTimeout(() => {
        //   onChange((v) => {
        //     deepSet(v, n, df, deepSetOptions);
        //   });
        // });
      }
      update(n);
    },
    unbind: (n: string, reserveAble?: boolean, validateFiled?: ValidateFn, update?: UpdateFn) => {
      const validateFieldSet = context.validateMap[n];
      if (validateFiled && validateFieldSet.has(validateFiled)) {
        validateFieldSet.delete(validateFiled);
      }

      const updateFieldSet = context.updateMap[n];
      if (update && updateFieldSet.has(update)) {
        updateFieldSet.delete(update);
      }

      if (validateFieldSet.size === 0 && updateFieldSet.size === 0) {
        context.names.delete(n);
        delete context.defaultValues[n];
      }
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
    clearValidate,
    validateFields,
    validateFieldset,
    insertError,
    spliceError,
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
      reserveAble,
    }),
    [
      labelWidth,
      labelAlign,
      labelVerticalAlign,
      keepErrorHeight,
      inline,
      disabled,
      size,
      reserveAble,
    ],
  );

  const updateValue = () => {
    if (props.value !== context.lastValue && props.value !== context.value) {
      context.value = (deepClone(props.value) || emptyObj) as T;
    }
    context.lastValue = props.value;
  };

  updateValue();

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
    // 内部 onChange 改的 value, 不需要更新
    if (props.value === context.value) return;
    if (initValidate && !context.resetTime) {
      const keys = Object.keys(context.validateMap).filter((key) => {
        const oldValue = deepGet(preValue || emptyObj, key);
        const newValue = deepGet(context.value || emptyObj, key);
        return !shallowEqual(oldValue, newValue);
      });
      validateFields(keys).catch(() => {});
    }
    update();
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
