import React from 'react';
import { useFormItem, util } from '@sheinx/hooks';
import { useTooltipStyle } from '@sheinx/shineout-style';
import classNames from 'classnames';
import ErrorTrans from './error-trans';
import Tooltip, { TooltipProps } from '../tooltip';
import Icons from '../icons';

import type { FormItemProps } from './form-item.type';

const FormItem = (props: FormItemProps) => {
  const { children, jssStyle, className, style, label, tip, required, ...rest } = props;
  const formItemClasses = jssStyle?.formItem?.();
  const { Provider, ProviderValue, labelConfig, errors, showError, attributes } = useFormItem();
  const { labelWidth, labelAlign, labelVerticalAlign, inline, keepErrorHeight } = {
    ...labelConfig,
    ...rest,
  };

  const renderLabel = () => {
    if (label === undefined || label === null) return null;

    let $tooltip;
    if (typeof label === 'object' && 'tooltip' in label && label.tooltip) {
      const tooltipProps = {
        jssStyle: { tooltip: useTooltipStyle },
        ...(typeof label.tooltip === 'object' && 'tip' in label.tooltip
          ? {
              ...label.tooltip,
              tip: label.tooltip.tip,
              position: label.tooltip?.position || 'top',
            }
          : { tip: label.tooltip, position: 'top' }),
      };

      $tooltip = (
        <Tooltip {...(tooltipProps as TooltipProps)}>
          <span className={formItemClasses?.labelTooltip}>
            {(tooltipProps as any).icon || Icons.form.Tooltip}
          </span>
        </Tooltip>
      );
    }

    if (typeof label === 'object' && 'tooltip' in label) {
      return (
        <>
          {label.content}
          {$tooltip}
        </>
      );
    }
    return label as React.ReactNode;
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
          {renderLabel()}
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

export default FormItem;
