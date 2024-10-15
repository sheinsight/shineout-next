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

import { BaseFormControlProps } from './use-form-control.type';
import { ObjectType } from '../../../common/type';
import useLatestObj from '../../../common/use-latest-obj';

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
  } = props;
  const { name, bind } = useFieldSetConsumer({
    name: props.name,
    bind: props.bind,
  });

  const [errorState, setErrorState] = React.useState<Error | undefined>(undefined);

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
      const value = getValue(name, formValue) as T;
      const error = getError(name, errors, severErrors);
      if (error !== errorState) {
        setErrorState(error);
      }
      if (!shallowEqual(value, latestInfo.valueState)) {
        if (value === undefined && defaultValue !== undefined) {
          setValueState(defaultValue);
        } else {
          setValueState(value);
        }
        latestInfo.valueState = value;
      }
    },
  );

  const validateFiled = usePersistFn(
    (
      name,
      v,
      formV,
      config: {
        ignoreBind?: boolean;
        type?: 'forcePass';
      } = {},
    ) => {
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
        return validate(v, formV, fullRules, validateProps)
          .then((res) => {
            const err = res === true ? undefined : res;
            formFunc?.setError(name, err);
            onError?.(err);
            bindValidate();
            return res;
          })
          .catch((e) => {
            formFunc?.setError(name, e);
            onError?.(e);
            bindValidate();
            return e;
          });
      } else {
        return validate(v, {}, rules || [], {})
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
    },
  );

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
      validateFiled('', v, undefined);
    }
    if (onChangePo) onChangePo(v, ...other);
  });

  useEffect(() => {
    if (inForm && controlFunc) {
      if (isArray(name)) {
        const dv = isArray(defaultValue) ? defaultValue : [];
        name.forEach((n, index) => {
          controlFunc.bind(n, dv[index], validateFiled, update);
        });
      } else {
        console.log('bind', name, defaultValue);
        controlFunc.bind(name, defaultValue, validateFiled, update);
      }
    }
    return () => {
      if (inForm && controlFunc) {
        if (isArray(name)) {
          name.forEach((n) => {
            controlFunc.unbind(n, reserveAble, validateFiled, update);
            updateError(n, undefined);
          });
        } else {
          controlFunc.unbind(name, reserveAble, validateFiled, update);
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
