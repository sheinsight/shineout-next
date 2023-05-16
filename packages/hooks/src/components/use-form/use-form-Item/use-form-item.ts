import React from 'react';
import { FormItemContext } from '../use-form-control/form-item-context';
import { LabelConfigContext } from '../use-form-control/label-config-context';

import { FormItemContextValueType } from '../use-form-control/use-form-control.type';

const UseFormItem = () => {
  const [errors, setErrors] = React.useState<{ [name: string]: Error }>({});
  const labelConfig = React.useContext(LabelConfigContext);
  const handlerErrorUpdate = (name: string, error: Error) => {
    if (name && errors[name] !== error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const msg = Object.keys(errors)
    .map((name) => {
      const err = errors[name];
      if (err instanceof Error) return err.message;
      return err;
    })
    .filter(Boolean);
  return {
    Provider: FormItemContext.Provider,
    ProviderValue: {
      updateError: handlerErrorUpdate,
    } as FormItemContextValueType,
    errors: msg,
    labelConfig,
  };
};

export default UseFormItem;
