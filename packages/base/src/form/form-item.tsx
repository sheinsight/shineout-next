import React from 'react';
import { useFormItem, util } from '@sheinx/hooks';
import { useTooltipStyle } from '@sheinx/shineout-style';
import classNames from 'classnames';
import ErrorTrans from './error-trans';
import Tooltip, { TooltipProps } from '../tooltip';
import Icons from '../icons';

import type { FormItemClasses, FormItemProps } from './form-item.type';

const FormItem = (props: FormItemProps) => {
  const { children, jssStyle, className, style, label, tip, required, ...rest } = props;
  const formItemClasses = jssStyle?.formItem?.() as FormItemClasses;
  const { Provider, ProviderValue, labelConfig, errors, showError, attributes } = useFormItem();
  const { labelWidth, labelAlign, labelVerticalAlign, inline, keepErrorHeight, keepErrorBelow, colon } = {
    ...labelConfig,
    ...rest,
  };


  const renderLabel = () => {
    if (label === undefined || label === null || label === '') return null;

    const $colon = colon === true ? ':' : colon;
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

    if (typeof label === 'object' && 'tooltip' in label && $tooltip) {
      return (
        <>
          <span>{label.content}</span>
          {$tooltip}
          <span className={formItemClasses?.labelColon}>{$colon}</span>
        </>
      );
    }

    if($colon){
      return (
        <>
          {label as React.ReactNode}
          <span className={formItemClasses?.labelColon}>{$colon}</span>
        </>
      )
    }

    return <>{label as React.ReactNode}</>;
  };

  return (
    <div
      className={classNames(
        className,
        formItemClasses?.wrapper,
        {
          [formItemClasses?.wrapperLabelTop]: labelAlign === 'top',
          [formItemClasses?.wrapperLabelVerticalMiddle]: labelAlign !== 'top' && labelVerticalAlign === 'middle',
          [formItemClasses?.wrapperLabelVerticalBottom]: labelAlign !== 'top' && labelVerticalAlign === 'bottom',
          [formItemClasses?.wrapperInline]: inline,
          [formItemClasses?.wrapperKeepHeight]: keepErrorHeight,
          [formItemClasses?.wrapperRequired]: required,
          [formItemClasses?.wrapperHideRequired]: required === false,
          [formItemClasses?.wrapperTip]: showError || tip,
        }
      )}
      {...attributes}
      style={style}
    >
      {label !== undefined ? (
        <div
          className={classNames(
            formItemClasses?.label,
            {
              [formItemClasses?.labelLeft]: labelAlign === 'left',
              [formItemClasses?.labelWithColon]: colon,
              [formItemClasses?.labelWithTooltip]: label && typeof label === 'object' && 'tooltip' in label
            }
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

        {!!tip && (!showError || keepErrorBelow) && <div className={formItemClasses?.tip}>{tip}</div>}

        {showError && (
          <div className={formItemClasses?.error}>
            {errors.map((error, index) => (
              <div key={index}>{error && <ErrorTrans error={error} />}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormItem;
