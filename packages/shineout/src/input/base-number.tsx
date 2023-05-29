import React from 'react';
import { Input, Icons } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
import { useInputNumber, useInputAble, util, usePersistFn } from '@shined/hooks';
import { BaseNumberProps } from './number.type';
import classNames from 'classnames';

export default (props: BaseNumberProps) => {
  const inputAbleParams = {
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    beforeChange: props.beforeChange,
  };
  const InputAbleProps = useInputAble<BaseNumberProps['value']>({
    control: 'value' in props,
    ...inputAbleParams,
  });

  const InputFormatParams = {
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    digits: props.digits,
    integerLimit: props.integerLimit,
    numType: props.numType,
    min: props.min,
    max: props.max,
    step: props.step,
  };

  const { onMinus, onPlus, ...inputFormatProps } = useInputNumber({
    value: InputAbleProps.value,
    onChange: InputAbleProps.onChange,
    ...InputFormatParams,
  });

  const jssStyle = useInputStyle();

  const resetProps = util.removeProps(props, { ...InputFormatParams, ...inputAbleParams });

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
      {...resetProps}
      {...inputFormatProps}
      className={classNames(resetProps.className, jssStyle.wrapperNumber)}
      onKeyDown={onKeyDown}
      suffix={suffix}
    />
  );
};
