import React from 'react';
import { Form } from '@shined/ui';
import { usePersistFn, util } from '@shined/hooks';
import Number from './base-number';
import useItemValidate from './use-item-validate';

import { InputNumberProps } from './number.type';

export default (props: InputNumberProps) => {
  const { name, onChange, defaultValue, rules, popover, tip, onError, status, ...rest } = props;
  const helpParams = {
    tip,
    popover,
  };
  const FieldParams = {
    name: props.name!,
    defaultValue: props.defaultValue,
    reservable: props.reservable,
    rules: props.rules,
    onError: props.onError,
  };

  const inputProps = util.removeProps(props, { ...helpParams, ...FieldParams });

  const [focused, setFocused] = React.useState(false);
  const [fieldError, setFieldError] = React.useState<Error | undefined>(undefined);
  const onFieldError = usePersistFn((e: Error | undefined) => {
    setFieldError(e);
    onError?.(e);
  });
  const onStatusChange = usePersistFn((status: { focused?: boolean }) => {
    setFocused(!!status.focused);
  });

  // todo  等待popover 组件开发后使用 popover 组件替换
  const renderTip = (err: Error | undefined) => {
    if (popover && err) return <span>{err.message}</span>;
    if (tip && focused) return <span>{tip}</span>;
  };

  if (!name) {
    const { onChange: onChangeWithValidate, error: itemError } = useItemValidate({
      rules,
      popover,
      onChange,
      onError,
    });
    return (
      <Number
        {...inputProps}
        getStatus={onStatusChange}
        defaultValue={defaultValue}
        onChange={onChangeWithValidate}
        suffix={renderTip(itemError)}
        status={itemError ? 'error' : status}
      />
    );
  }
  return (
    <Form.Field {...FieldParams} onError={onFieldError}>
      <Number {...rest} suffix={renderTip(fieldError)} />
    </Form.Field>
  );
};
