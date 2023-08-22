import React from 'react';
import { util } from '@sheinx/hooks';
import { ExtendsFieldProps, TipProps } from '../../dist/cjs/@types/common';
import { FormField } from '@sheinx/base';

export interface FiledItemCommonProps {
  defaultValue?: any;
  onChange?: (...args: any) => void;
}

export type GetWithFieldProps<Props, Value> = Props & ExtendsFieldProps<Value> & TipProps;
const useFieldCommon = <Props extends FiledItemCommonProps, Value>(
  props: GetWithFieldProps<Props, Value>,
  Origin: React.ComponentType<Props>,
) => {
  const FieldParams = {
    name: props.name!,
    defaultValue: props.defaultValue,
    reservable: props.reservable,
    rules: props.rules,
    onError: props.onError,
    bind: props.bind,
  };

  const forwardProps = util.removeProps(props, { ...FieldParams });

  return (
    <FormField {...FieldParams}>
      <Origin {...(forwardProps as Props)} defaultValue={props.defaultValue} />
    </FormField>
  );
};

export default useFieldCommon;
