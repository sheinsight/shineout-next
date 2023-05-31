import React from 'react';
import { Input, Icons } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
import { useInputNumber, useInputAble, util, usePersistFn } from '@shined/hooks';
import useClear from '../hooks/use-clear';

import { BaseNumberProps } from './number.type';
import classNames from 'classnames';

export default (props: BaseNumberProps) => {
  const { forwardRef, ...restProps } = props;
  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    beforeChange: props.beforeChange,
  };
  const inputAbleProps = useInputAble<BaseNumberProps['value']>({
    control: 'value' in props,
    ...inputAbleParams,
  });

  const clearParams = {
    clearable: props.clearable,
    clearToUndefined: props.clearToUndefined,
  };
  const clearProps = useClear({
    ...clearParams,
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
  });

  const inputFormatParams = {
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    digits: props.digits,
    integerLimit: props.integerLimit,
    numType: props.numType,
    min: props.min,
    max: props.max,
    step: props.step,
    allowNull: props.allowNull,
  };

  const { onMinus, onPlus, ...inputFormatProps } = useInputNumber({
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    ...inputFormatParams,
  });

  const jssStyle = useInputStyle();

  const forwardProps = util.removeProps(restProps, {
    ...inputFormatParams,
    ...inputAbleParams,
    ...clearParams,
  });

  const suffix = (
    <React.Fragment>
      <div className={jssStyle.numberStep}>
        <span onMouseDown={onPlus}>{Icons.AngleRight}</span>
        <span onMouseDown={onMinus}>{Icons.AngleLeft}</span>
      </div>
      {props.suffix}
    </React.Fragment>
  );
  const onKeyDown = usePersistFn((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onPlus();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onMinus();
    }
    props.onKeyDown?.(e);
  });
  return (
    <Input
      jssStyle={jssStyle}
      {...forwardProps}
      {...inputFormatProps}
      {...clearProps}
      value={inputFormatProps.value || ''}
      className={classNames(forwardProps.className, jssStyle.wrapperNumber)}
      onKeyDown={onKeyDown}
      suffix={suffix}
      inputRef={forwardRef}
    />
  );
};
