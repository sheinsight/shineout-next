import React from 'react';
import { util, usePersistFn, useFormDatum } from '@sheinx/hooks';
import { FormField } from '@sheinx/base';
import type { FormFieldProps } from '@sheinx/base';

export interface ExtendsFieldProps<T, Name = string>
  extends Omit<
    FormFieldProps<T>,
    'value' | 'defaultValue' | 'children' | 'onChange' | 'name' | 'getProps' | 'getValidateProps'
  > {
  /**
   * @en The key access data in the Form
   * @cn Form 内存取数据的 key
   */
  name?: Name;
  defaultValue?: T;
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: T) => T | undefined | void;
  /**
   * @private for rule
   */
  title?: string;
}
export interface FieldItemCommonProps {
  defaultValue?: any;
  onChange?: (...args: any) => void;
  beforeChange?: (value: any) => any;
}

export type GetWithFieldProps<Props, Value, Name = string> = Omit<Props, 'beforeChange'> &
  ExtendsFieldProps<Value, Name>
const useFieldCommon = <
  Props extends FieldItemCommonProps,
  Value,
  Name extends string | string[] = string,
>(
  props: GetWithFieldProps<Props, Value, Name> & {htmlName?: string},
  Origin: React.ComponentType<Props>,
  type?: 'number' | 'string' | 'array',
) => {
  const getValidateProps = usePersistFn(() => ({ type, ...props }));
  const datum = useFormDatum();
  const beforeChange = usePersistFn((value: any) => {
    // @ts-ignore 兼容历史版本 ts 不暴露
    return props.beforeChange?.(value, datum);
  });
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
      <Origin
        {...(forwardProps as Props)}
        defaultValue={props.defaultValue}
        beforeChange={beforeChange}
        htmlName={props.htmlName || props.name}
      />
    </FormField>
  );
};

export default useFieldCommon;
