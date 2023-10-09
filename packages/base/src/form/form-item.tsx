import React from 'react';
import { useFormItem } from '@sheinx/hooks';
import classNames from 'classnames';

import { FormItemProps } from './form-item.type';

export default (props: FormItemProps) => {
  const { children, jssStyle, className, style, label, tip, required, ...rest } = props;
  const formItemClasses = jssStyle?.formItem?.();
  const { Provider, ProviderValue, labelConfig, errors } = useFormItem();
  const { labelWidth, labelAlign, labelVerticalAlign, inline, keepErrorHeight } = {
    ...labelConfig,
    ...rest,
  };

  const showError = !!errors?.length;

  return (
    <div
      className={classNames(
        className,
        formItemClasses?.wrapper,
        labelAlign === 'top' && formItemClasses?.wrapperLabelTop,
        labelAlign !== 'top' &&
          labelVerticalAlign === 'middle' &&
          formItemClasses?.wrapperLabelVerticalMiddle,
        labelAlign !== 'top' &&
          labelVerticalAlign === 'bottom' &&
          formItemClasses?.wrapperLabelVerticalBottom,
        inline && formItemClasses?.wrapperInline,
        keepErrorHeight && formItemClasses?.wrapperKeepHeight,
        required && formItemClasses?.wrapperRequired,
        (showError || tip) && formItemClasses?.wrapperTip,
      )}
      style={style}
    >
      {label !== undefined ? (
        <div
          className={classNames(
            formItemClasses?.label,
            labelAlign === 'left' && formItemClasses?.labelLeft,
          )}
          style={{ width: labelWidth }}
        >
          {label}
        </div>
      ) : null}
      <div className={formItemClasses?.control}>
        <Provider value={ProviderValue}>{children}</Provider>
        {showError && (
          <div className={formItemClasses?.error}>
            {errors.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
        )}
        {!!tip && !showError && <div className={formItemClasses?.tip}>{tip}</div>}
      </div>
    </div>
  );
};
