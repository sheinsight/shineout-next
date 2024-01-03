import React, { useEffect } from 'react';
import { useFormFunc } from '../form-func-context';
import { useFormBind } from '../form-bind-context';
import { FormItemContext } from '../use-form-item/form-item-context';
import { useFieldSetConsumer } from '../use-form-fieldset/fieldset-context';
import { deepGet, isArray, validate } from '../../../utils';
import usePersistFn from '../../../common/use-persist-fn';

import { BaseFormControlProps } from './use-form-control.type';
import { ObjectType } from '../../../common/type';

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

  const {
    value: formValue = {},
    func: controlFunc,
    errors,
    disabled,
    serverErrors,
  } = useFormBind();
  const formFunc = useFormFunc();
  const { updateError } = React.useContext(FormItemContext);

  const getValue = () => {
    if (!name) return undefined;
    if (isArray(name)) {
      return name.map((n) => deepGet(formValue, n)) as T;
    }
    return deepGet(formValue, name) as T;
  };

  const getError = () => {
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

  if (name && formFunc) {
    inForm = true;
    value = getValue();
    error = getError();
  }

  const validateFiled = usePersistFn((name, v, formV, config = {}) => {
    const validateProps = getValidateProps?.() || {};
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
  });

  useEffect(() => {
    if (inForm && controlFunc) {
      if (isArray(name)) {
        const dv = isArray(defaultValue) ? defaultValue : [];
        name.forEach((n, index) => {
          controlFunc.bind(n, dv[index], validateFiled);
        });
      } else {
        controlFunc.bind(name, defaultValue, validateFiled);
      }
    }
    return () => {
      if (inForm && controlFunc) {
        if (isArray(name)) {
          name.forEach((n) => {
            controlFunc.unbind(n, reserveAble);
          });
        } else {
          controlFunc.unbind(name, reserveAble);
        }
      }
    };
  }, [name]);
  useEffect(() => {
    updateError(isArray(name) ? name.join('|') : name, error);
  }, [error]);

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

  return { value, onChange, error, inForm, disabled };
}
