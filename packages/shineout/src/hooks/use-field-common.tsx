import React from 'react';
import { util, usePersistFn } from '@sheinx/hooks';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import { FormField } from '@sheinx/base';

export interface FiledItemCommonProps {
  defaultValue?: any;
  onChange?: (...args: any) => void;
}

export type GetWithFieldProps<Props, Value, Name = string> = Props &
  ExtendsFieldProps<Value, Name> &
  TipProps;
const useFieldCommon = <
  Props extends FiledItemCommonProps,
  Value,
  Name extends string | string[] = string,
>(
  props: GetWithFieldProps<Props, Value, Name>,
  Origin: React.ComponentType<Props>,
  type?: 'number' | 'string' | 'array',
) => {
  const getValidateProps = usePersistFn(() => ({ type, ...props }));
  const FieldParams = {
    name: props.name!,
    defaultValue: props.defaultValue,
    reserveAble: props.reserveAble,
    rules: props.rules,
    onError: props.onError,
    bind: props.bind,
    onChange: props.onChange,
    getValidateProps,
  };

  const forwardProps = util.removeProps(props, { ...FieldParams });

  return (
    <FormField {...FieldParams}>
      <Origin {...(forwardProps as Props)} defaultValue={props.defaultValue} />
    </FormField>
  );
};

export default useFieldCommon;
