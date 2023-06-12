import React from 'react';
import { Input, Icons } from '@sheinx/ui';
import { useInputStyle } from '@sheinx/shineout-style';
import { useInputNumber, util, usePersistFn } from '@sheinx/hooks';

import { BaseNumberProps } from './number.type';
import classNames from 'classnames';
import useInputCommon from './use-input-common';

export default (props: BaseNumberProps) => {
  const jssStyle = useInputStyle();

  const commonProps = useInputCommon<BaseNumberProps['value'], BaseNumberProps>(props);
  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    beforeChange: props.beforeChange,
  };

  const numberFormatParams = {
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

  const { onMinus, onPlus, ...numberFormatProps } = useInputNumber({
    value: commonProps.value,
    onChange: commonProps.onChange,
    ...numberFormatParams,
  });

  const forwardProps = util.removeProps(commonProps, {
    ...inputAbleParams,
    ...numberFormatParams,
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
      {...numberFormatProps}
      value={numberFormatProps.value || ''}
      className={classNames(forwardProps.className, jssStyle.wrapperNumber)}
      onKeyDown={onKeyDown}
      suffix={suffix}
    />
  );
};
