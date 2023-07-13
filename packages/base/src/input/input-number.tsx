import React from 'react';
import SimpleInput from './simple-input';
import Icons from '../icons';
import { useInputNumber, usePersistFn, util } from '@sheinx/hooks';

import { InputNumberProps } from './input-number.type';
import classNames from 'classnames';
import useInputCommon from './use-input-common';

export default (props: InputNumberProps) => {
  const commonProps = useInputCommon<InputNumberProps['value'], InputNumberProps>(props);
  const { jssStyle, ...restProps } = commonProps;

  const numberFormatParams = {
    onBlur: restProps.onBlur,
    onFocus: restProps.onFocus,
    digits: restProps.digits,
    integerLimit: restProps.integerLimit,
    numType: restProps.numType,
    min: restProps.min,
    max: restProps.max,
    step: restProps.step,
    allowNull: restProps.allowNull,
  };

  const { onMinus, onPlus, ...numberFormatProps } = useInputNumber({
    value: commonProps.value,
    onChange: commonProps.onChange,
    disabled: !!commonProps.disabled,
    ...numberFormatParams,
  });

  const forwardProps = util.removeProps(commonProps, {
    ...numberFormatParams,
  });

  const suffix = (
    <React.Fragment>
      <div className={jssStyle.numberStep}>
        <span
          onMouseDown={(e) => {
            // 阻止默认事件，防止点击按钮时，input失去焦点
            e.preventDefault();
            onPlus();
          }}
        >
          {Icons.AngleRight}
        </span>
        <span
          onMouseDown={(e) => {
            // 阻止默认事件，防止点击按钮时，input失去焦点
            e.preventDefault();
            onMinus();
          }}
        >
          {Icons.AngleLeft}
        </span>
      </div>
      {restProps.suffix}
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
    restProps.onKeyDown?.(e);
  });
  return (
    <SimpleInput
      {...forwardProps}
      {...numberFormatProps}
      jssStyle={jssStyle}
      value={numberFormatProps.value || ''}
      className={classNames(forwardProps.className, jssStyle.wrapperNumber)}
      onKeyDown={onKeyDown}
      suffix={suffix}
    />
  );
};
