import React from 'react';
import SimpleInput from './simple-input';
import Icons from '../icons';
import { useInputNumber, usePersistFn, util } from '@sheinx/hooks';

import { InputNumberProps } from './input-number.type';
import clsx from 'clsx';
import useInputCommon from './use-input-common';

const InputNumber = (props: InputNumberProps) => {
  const commonProps = useInputCommon<InputNumberProps['value'], InputNumberProps>(props);
  const {
    jssStyle,
    hideArrow,
    numType,
    integerLimit,
    digits,
    min,
    max,
    step,
    allowNull,
    coin,
    ...restProps
  } = commonProps;
  const inputStyle = jssStyle?.input?.();

  const numberFormatParams = {
    onBlur: restProps.onBlur,
    onFocus: restProps.onFocus,
    digits: digits,
    integerLimit: integerLimit,
    numType: numType,
    min: min,
    max: max,
    step: step,
    allowNull: allowNull,
    coin: coin,
  };

  const { onMinus, onPlus, ...numberFormatProps } = useInputNumber({
    value: commonProps.value,
    onChange: commonProps.onChange,
    disabled: !!commonProps.disabled,
    ...numberFormatParams,
  });

  const forwardProps = util.removeProps(commonProps, {
    ...numberFormatParams,
    hideArrow,
  });

  const addEnd = hideArrow ? null : (
    <React.Fragment>
      <div className={inputStyle?.numberStep}>
        <span
          onMouseDown={(e) => {
            // 阻止默认事件，防止点击按钮时，input失去焦点
            e.preventDefault();
            onPlus();
          }}
        >
          {Icons.input.ArrowRight}
        </span>
        <span
          onMouseDown={(e) => {
            // 阻止默认事件，防止点击按钮时，input失去焦点
            e.preventDefault();
            onMinus();
          }}
        >
          {Icons.input.ArrowLeft}
        </span>
      </div>
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
      className={clsx(forwardProps.className, inputStyle?.wrapperNumber)}
      onKeyDown={onKeyDown}
      addEnd={addEnd}
      showClear={props.showClear}
    />
  );
};

export default React.memo(InputNumber);
