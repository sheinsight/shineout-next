import React, { useMemo } from 'react';
import type { FormItemContextValueType } from './form-item-context';
import { FormItemContext } from './form-item-context';
import { useFormConfig } from '../form-config-context';
import usePersistFn from '../../../common/use-persist-fn';
import { getDataAttribute } from '../../../utils/attribute';
import { produce } from '../../../utils/immer';

const UseFormItem = () => {
  const [errors, setErrors] = React.useState<{ [name: string]: Error | undefined }>({});
  const formConfig = useFormConfig();
  const handlerErrorUpdate = usePersistFn((name: string, error?: Error) => {
    if (errors[name] !== error) {
      setErrors((prev) => {
        return produce(prev, (draft) => {
          if (error) {
            draft[name] = error;
          } else {
            delete draft[name];
          }
        });
      });
    }
  });

  const msg = Object.values(errors).filter(Boolean) as Error[];

  const showError = msg && msg.length > 0;

  const attributes = getDataAttribute({ status: showError ? 'error' : 'default' });
  const ProviderValue = useMemo<FormItemContextValueType>(() => {
    return {
      updateError: handlerErrorUpdate,
    };
  }, [handlerErrorUpdate]);

  return {
    Provider: FormItemContext.Provider,
    ProviderValue,
    errors: msg,
    labelConfig: formConfig,
    attributes,
    showError,
  };
};

export default UseFormItem;
