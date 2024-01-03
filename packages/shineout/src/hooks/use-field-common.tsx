import React from 'react';
import { util, usePersistFn } from '@sheinx/hooks';
import { ExtendsFieldProps, TipProps } from '../@types/common';
import { FormField } from '@sheinx/base';

export interface FiledItemCommonProps {
  defaultValue?: any;
  onChange?: (...args: any) => void;
}

export type GetWithFieldProps<Props, Value> = Props & ExtendsFieldProps<Value> & TipProps;
const useFieldCommon = <Props extends FiledItemCommonProps, Value>(
  props: GetWithFieldProps<Props, Value>,
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
