import React from 'react';
import { FormItemContext } from '../../logic/useFormControl/formItemContext';
import { LabelConfigContext } from '../../logic/useFormControl/labelConfigContext';

import type { FormItemContextValueType } from '../../logic/useFormControl/useFormControl.types';

const UseFormItem = () => {
  const [errors, setErrors] = React.useState<{ [name: string]: Error }>({});
  const labelConfig = React.useContext(LabelConfigContext);
  const handlerErrorUpdate = (name: string, error: Error) => {
    if (name && errors[name] !== error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const helps = Object.keys(errors)
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
    helps,
    labelConfig,
  };
};

export default UseFormItem;
