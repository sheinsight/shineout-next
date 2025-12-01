import React, { useEffect } from 'react';
import { useFormFunc } from '../form-func-context';
import { useFormBind } from '../form-bind-context';
import { FormItemContext } from '../use-form-item/form-item-context';
import { useFieldSetConsumer } from '../use-form-fieldset/fieldset-context';
import { isArray } from '../../../utils/is';
import { validate } from '../../../utils/validate';
import { deepGet } from '../../../utils/object';
import { shallowEqual } from '../../../utils/shallow-equal';
import usePersistFn from '../../../common/use-persist-fn';
import { BaseFormControlProps, FormControlContext } from './use-form-control.type';
import { ObjectType } from '../../../common/type';
import useLatestObj from '../../../common/use-latest-obj';
import { ValidateFnConfig } from '../use-form.type';
import { devUseWarning } from '../../../utils/warning';
import { cleanProps } from '../../../utils/clean-props';

const getValue = (name: string | string[], formValue: ObjectType) => {
  if (!name) return undefined;
  if (isArray(name)) {
    return name.map((n) => deepGet(formValue, n));
  }
  return deepGet(formValue, name);
};

const getError = (name: string | string[], errors: ObjectType, serverErrors: ObjectType) => {
  if (!name) return undefined;
  if (isArray(name)) {
    for (let i = 0; i < name.length; i++) {
      const err = ((errors ?? {})[name[i]] || (serverErrors ?? {})[name[i]]) as Error;
      if (err) return err;
    }
    return;
  } else {
    return ((errors ?? {})[name] || (serverErrors ?? {})[name]) as Error;
  }
};

export default function useFormControl<T>(props: BaseFormControlProps<T>) {
  const {
    onChange: onChangePo,
    reserveAble,
    defaultValue,
    rules,
    onError,
    getValidateProps,
    clearToUndefined,
  } = props;
  const { name, bind, validateFieldSet } = useFieldSetConsumer({
    name: props.name,
    bind: props.bind,
  });

  const [errorState, setErrorState] = React.useState<Error | undefined>(undefined);

  const { current: context } = React.useRef<FormControlContext>({
    mounted: false,
  });

  let value: T | undefined;
  let error: Error | undefined = errorState;
  let inForm = false;

  const { func: controlFunc, disabled } = useFormBind();
  const formFunc = useFormFunc();
  const { updateError } = React.useContext(FormItemContext);

  const formValue =
    name && formFunc
      ? Array.isArray(name)
        ? name.map((n) => formFunc.getValue(n))
        : formFunc.getValue(name)
      : undefined;
  const [valueState, setValueState] = React.useState<T | undefined>(formValue);

  const latestInfo = useLatestObj({ valueState });

  if (name && formFunc) {
    inForm = true;
    value = valueState;
    if (isArray(name) && !isArray(value)) {
      value = [] as T;
    }
  }

  const update = usePersistFn(
    (formValue: ObjectType = {}, errors: ObjectType, severErrors: ObjectType) => {
      if (!name) return;
      // 加入defaultValue的判断，让其只对 https://github.com/sheinsight/shineout-next/pull/742 的场景生效
      // 如果不加入defaultValue的判断，会导致 8ea43144-36a5-403a-9147-59d54087a110 的问题
      if (isArray(name) && defaultValue !== undefined) {
        const value = getValue(name, formValue) as T[];
        const error = getError(name, errors, severErrors);
        if (error !== errorState) {
          setErrorState(error);
        }
        // format defaultValue
        const dv = isArray(defaultValue) ? defaultValue : [];
        const nextValue = [] as T[];
        name.forEach((n, index) => {
          if (value[index] === undefined && dv[index] !== undefined) {
            if (clearToUndefined) {
              nextValue[index] = undefined as T;
            } else {
              nextValue[index] = dv[index];
            }
          } else {
            nextValue[index] = value[index];
          }
        });
        setValueState(nextValue as T);
      } else {
        const value = getValue(name, formValue) as T;
        const error = getError(name, errors, severErrors);
        if (error !== errorState) {
          setErrorState(error);
        }
        if (!shallowEqual(value, latestInfo.valueState)) {
          if (value === undefined && defaultValue !== undefined) {
            if (clearToUndefined) {
              setValueState(undefined);
            } else {
              setValueState(defaultValue);
            }
          } else {
            setValueState(value);
          }
          latestInfo.valueState = value;
        }
      }
    },
  );

  const validateField = usePersistFn((name, v, formV, config: ValidateFnConfig = {}) => {
    const validateProps = getValidateProps?.() || {};
    if (config.type === 'forcePass') {
      if (inForm) {
        formFunc?.setError(name, undefined);
      } else {
        setErrorState(undefined);
      }
      onError?.(undefined);
      return Promise.resolve(true);
    }
    if (inForm) {
      const bindValidate = () => {
        if (!config.ignoreBind && isArray(bind)) {
          formFunc?.validateFields(bind, { ignoreBind: true }).catch(() => {});
        }
      };
      const fullRules = controlFunc?.combineRules(name, rules || []) || [];
      return validate(v, formV, fullRules, cleanProps(validateProps))
        .then((res) => {
          const err = res === true ? undefined : res;
          formFunc?.setError(name, err);
          onError?.(err);
          bindValidate();
          return res;
        })
        .catch((e) => {
          if (isArray(e)) {
            e.forEach((error, index) => {
              if (error) {
                const keys = Object.keys(error);
                keys.forEach((fieldName) => {
                  const fieldError = error?.[fieldName] as Error;
                  const na = `${name}[${index}].${fieldName}`;
                  if (fieldName && fieldError) {
                    formFunc?.setError(na, fieldError);
                  }
                });
              }
            });
          } else {
            formFunc?.setError(name, e);
          }
          onError?.(e);
          bindValidate();
          return e;
        });
    } else {
      return validate(v, {}, rules || [], cleanProps(validateProps))
        .then((res) => {
          const err = res === true ? undefined : res;
          setErrorState(err);
          onError?.(err);
          return res;
        })
        .catch((e) => {
          setErrorState(e);
          onError?.(e);
          return e;
        });
    }
  });

  const onChange = usePersistFn((v: T, ...other: any[]) => {
    if (inForm && formFunc) {
      if (isArray(name)) {
        const arrV = isArray(v) ? v : [];
        const objetcV = name.reduce((result, name, index) => {
          result[name] = arrV[index];
          return result;
        }, {} as ObjectType);
        formFunc.setValue(objetcV, { validate: true });
      } else {
        formFunc.setValue({ [name]: v }, { validate: true });
      }
    } else {
      validateField('', v, undefined);
    }
    if (onChangePo) onChangePo(v, ...other);
    if (validateFieldSet) validateFieldSet();
  });

  const initError = usePersistFn(() => {
    const errors = formFunc?.getErrors();
    if (isArray(name)) {
      for(let i = 0; i < name.length; i++) {
        const n = name[i];
        const currentErrorInForm = errors?.[n];
        if (currentErrorInForm) {
          setErrorState(currentErrorInForm);
          break;
        }
      }
    } else {
      const currentErrorInForm = errors?.[name];
      if (currentErrorInForm) {
        setErrorState(currentErrorInForm);
      }
    }
  })

  useEffect(() => {
    if (inForm && controlFunc) {
      initError();

      if (isArray(name)) {
        const dv = isArray(defaultValue) ? defaultValue : [];
        name.forEach((n, index) => {
          const v = formFunc?.getValue(n);
          const bindedValue = v === undefined ? dv[index] : v;
          controlFunc.bind(n, context.mounted ? bindedValue : dv[index], validateField, update);
        });
      } else {
        const v = formFunc?.getValue(name);
        const bindedValue = v === undefined ? defaultValue : v;
        controlFunc.bind(name, context.mounted ? bindedValue : defaultValue, validateField, update);
      }
      if (context.mounted) {
        devUseWarning.warn(
          'Please avoid modifying the name property after the component has mounted, as this may result in unintended behavior or errors.',
        );
      }
    }
    context.mounted = true;
    return () => {
      if (inForm && controlFunc) {
        if (isArray(name)) {
          name.forEach((n) => {
            controlFunc.unbind(n, reserveAble, validateField, update);
          });
          updateError(isArray(name) ? name.join('|') : name, undefined);
        } else {
          controlFunc.unbind(name, reserveAble, validateField, update);
          updateError(name, undefined);
        }
      }
    };
  }, [name?.toString()]);

  useEffect(() => {
    updateError(isArray(name) ? name.join('|') : name, error);
  }, [error]);

  return { value, onChange, error, inForm, disabled, name };
}
