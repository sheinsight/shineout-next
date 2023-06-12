import * as React from 'react';
import { usePersistFn, useValidate, RuleFunc } from '@shined/hooks';

type Props = {
  rules?: RuleFunc[];
  popover?: React.ReactNode;
  onChange?: (...args: any[]) => any;
  onError?: (error?: Error) => void;
};

const useItemValidate = (props: Props) => {
  const { rules, popover, onChange, onError } = props;
  const { error, validate } = useValidate({ rules, shouldSetError: !popover });
  const onChangeWithValidate = usePersistFn((value?: any, ...reset: any) => {
    validate(value).then((result) => {
      onError?.(result);
    });
    onChange?.(value, ...reset);
  });
  return {
    onChange: onChangeWithValidate,
    error,
  };
};

export default useItemValidate;
