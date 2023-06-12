import React from 'react';
import { useFormItem } from '@sheinx/hooks';
import classNames from 'classnames';

import { FormItemProps } from './form-item.type';

export default (props: FormItemProps) => {
  const { children, jssStyle, className, style, label, tip, required, ...rest } = props;
  const { Provider, ProviderValue, labelConfig, errors } = useFormItem();
  const { labelWidth, labelAlign, labelVerticalAlign, inline } = {
    ...labelConfig,
    ...rest,
  };

  const showError = !!errors?.length;

  return (
    <div
      className={classNames(
        className,
        jssStyle?.wrapper,
        labelAlign === 'top' && jssStyle?.wrapperLabelTop,
        labelAlign !== 'top' &&
          labelVerticalAlign === 'middle' &&
          jssStyle?.wrapperLabelVerticalMiddle,
        labelAlign !== 'top' &&
          labelVerticalAlign === 'bottom' &&
          jssStyle?.wrapperLabelVerticalBottom,
        inline && jssStyle?.wrapperInline,
        // keepErrorHeight && jssStyle?.wrapperKeepHeight,
        required && jssStyle?.wrapperRequired,
        (showError || tip) && jssStyle?.wrapperTip,
      )}
      style={style}
    >
      {label !== undefined ? (
        <div
          className={classNames(jssStyle?.label, labelAlign === 'left' && jssStyle?.labelLeft)}
          style={{ width: labelWidth }}
        >
          {label}
        </div>
      ) : null}
      <div className={jssStyle?.control}>
        <Provider value={ProviderValue}>{children}</Provider>
        {showError && (
          <div className={jssStyle?.error}>
            {errors.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
        )}
        {!!tip && !showError && <div className={jssStyle?.tip}>{tip}</div>}
      </div>
    </div>
  );
};
