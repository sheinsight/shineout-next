import React, { useEffect } from 'react';
import { FormContext } from './form-context';
import { FormItemContext } from '../use-form-item/form-item-context';
import { useFieldSetConsumer } from '../use-form-fieldset/fieldset-context';
import { deepGet, isArray, validate } from '../../../utils';
import usePersistFn from '../../../common/use-persist-fn';

import { BaseFormControlProps } from './use-form-control.type';
import { ObjectType } from '../../../common/type';

export default function useFormControl<T>(props: BaseFormControlProps<T>) {
  const { onChange: onChangePo, reservable, defaultValue, rules, onError } = props;
  const { name, bind } = useFieldSetConsumer({
    name: props.name,
    bind: props.bind,
  });

  let value: T | undefined;
  let error: Error | undefined = undefined;
  let inForm = false;

  const { value: formValue = {}, formFunc, errors } = React.useContext(FormContext);
  const { updateError } = React.useContext(FormItemContext);

  const getValue = () => {
    if (isArray(name)) {
      return name.map((n) => deepGet(formValue, n)) as T;
    }
    return deepGet(formValue, name) as T;
  };

  const getError = () => {
    if (isArray(name)) {
      for (let i = 0; i < name.length; i++) {
        const err = (errors ?? {})[name[i]] as Error;
        if (err) return err;
      }
      return;
    } else {
      return (errors ?? {})[name] as Error;
    }
  };

  if (!name) {
    console.error('[Form.Filed] name is required');
  } else {
    if (formFunc) {
      inForm = true;
      value = getValue();
      error = getError();
    } else {
      console.error('[Form Field] should render in Form');
    }
  }

  const validateFiled = usePersistFn((name, v, formV, config = {}) => {
    const bindValidate = () => {
      if (!config.ignoreBind && isArray(bind)) {
        formFunc?.validateFields(bind, { ignoreBind: true }).catch(() => {});
      }
    };
    return validate(v, formV, rules || [], {})
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
  });

  useEffect(() => {
    if (formFunc) {
      if (isArray(name)) {
        const dv = isArray(defaultValue) ? defaultValue : [];
        name.forEach((n, index) => {
          formFunc.bind(n, dv[index], validateFiled);
        });
      } else {
        formFunc.bind(name, defaultValue, validateFiled);
      }
    }
    return () => {
      if (formFunc) {
        if (isArray(name)) {
          name.forEach((n) => {
            formFunc.unbind(n, reservable);
          });
        } else {
          formFunc.unbind(name, reservable);
        }
      }
    };
  }, [name]);

  useEffect(() => {
    updateError(isArray(name) ? name.join('|') : name, error);
  }, [error]);

  const onChange = usePersistFn((v: T, ...other: any[]) => {
    if (formFunc) {
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
    }
    if (onChangePo) onChangePo(v, ...other);
  });
  return { value, onChange, error, inForm };
}
