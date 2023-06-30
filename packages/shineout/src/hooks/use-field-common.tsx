import React from 'react';
import { usePersistFn, util } from '@sheinx/hooks';
import { ExtendsFieldProps, TipProps } from '../../dist/cjs/@types/common';
import useItemValidate from './use-item-validate';
import { FormField } from '@sheinx/base';

export interface FiledItemCommonProps {
  defaultValue?: any;
  suffix?: React.ReactNode;
  onChange?: (...args: any) => void;
  status?: 'error';
  getStatus?: (config: { focused?: boolean }) => void;
}

export type GetWithFieldProps<Props, Value> = Omit<Props, 'getStatus'> &
  ExtendsFieldProps<Value> &
  TipProps;
const useFieldCommon = <Props extends FiledItemCommonProps, Value>(
  props: GetWithFieldProps<Props, Value>,
  Origin: React.ComponentType<Props>,
) => {
  const helpParams = {
    tip: props.tip,
    popover: props.popover,
  };
  const FieldParams = {
    name: props.name!,
    defaultValue: props.defaultValue,
    reservable: props.reservable,
    rules: props.rules,
    onError: props.onError,
    bind: props.bind,
  };

  const forwardProps = util.removeProps(props, { ...helpParams, ...FieldParams });

  const [focused, setFocused] = React.useState(false);
  const [fieldError, setFieldError] = React.useState<Error | undefined>(undefined);
  const onFieldError = usePersistFn((e: Error | undefined) => {
    setFieldError(e);
    props.onError?.(e);
  });
  const onStatusChange = usePersistFn((status: { focused?: boolean }) => {
    setFocused(!!status.focused);
  });

  // todo  等待popover 组件开发后使用 popover 组件替换
  const renderTip = (err: Error | undefined) => {
    let info;
    if (props.popover && err) {
      info = <span key={'tip'}>{err.message}</span>;
    } else if (props.tip && focused) info = <span key={'tip'}>{props.tip}</span>;
    return (
      <>
        {props.suffix}
        {info}
      </>
    );
  };

  const { onChange: onChangeWithValidate, error: itemError } = useItemValidate({
    rules: props.rules,
    popover: props.popover,
    onChange: props.onChange,
    onError: props.onError,
  });

  if (!props.name) {
    return (
      <Origin
        {...(forwardProps as Props)}
        getStatus={onStatusChange}
        defaultValue={props.defaultValue}
        onChange={onChangeWithValidate}
        suffix={renderTip(itemError)}
        status={itemError ? 'error' : props.status}
      />
    );
  }
  return (
    <FormField {...FieldParams} onError={onFieldError}>
      <Origin {...(forwardProps as Props)} suffix={renderTip(fieldError)} />
    </FormField>
  );
};

export default useFieldCommon;
