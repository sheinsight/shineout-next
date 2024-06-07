import React from 'react';
import { useFormItem, util } from '@sheinx/hooks';
import classNames from 'classnames';
import ErrorTrans from './error-trans';

import type { FormItemProps } from './form-item.type';

export default (props: FormItemProps) => {
  const { children, jssStyle, className, style, label, tip, required, ...rest } = props;
  const formItemClasses = jssStyle?.formItem?.();
  const { Provider, ProviderValue, labelConfig, errors, showError, attributes } = useFormItem();
  const { labelWidth, labelAlign, labelVerticalAlign, inline, keepErrorHeight } = {
    ...labelConfig,
    ...rest,
  };

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
      {...attributes}
      style={style}
    >
      {label !== undefined ? (
        <div
          className={classNames(
            formItemClasses?.label,
            labelAlign === 'left' && formItemClasses?.labelLeft,
          )}
          style={labelAlign !== 'top' || inline ? { width: labelWidth } : undefined}
        >
          {label}
        </div>
      ) : null}
      <div
        className={formItemClasses?.control}
        {...util.getDataAttribute({ role: 'form-control' })}
      >
        <Provider value={ProviderValue}>{children}</Provider>
        {showError && (
          <div className={formItemClasses?.error}>
            {errors.map((error, index) => (
              <div key={index}>{error && <ErrorTrans error={error} />}</div>
            ))}
          </div>
        )}
        {!!tip && !showError && <div className={formItemClasses?.tip}>{tip}</div>}
      </div>
    </div>
  );
};
