import React, { useContext, useRef } from 'react';
import { useFormItem, util } from '@sheinx/hooks';
import { useTooltipStyle } from '@sheinx/shineout-style';
import classNames from 'classnames';
import ErrorTrans from './error-trans';
import Tooltip, { TooltipProps } from '../tooltip';
import Icons from '../icons';
import { useSemantic } from '../common/use-semantic';
import { useConfig } from '../config';
import { FormSemanticContext } from './form-semantic-context';

import type { FormItemClasses, FormItemProps, FormItemSemanticKey } from './form-item.type';

const FormItem = (props: FormItemProps) => {
  const { children, jssStyle, className, style, label, tip, required, classNames: classNamesProp, styles: stylesProp, ...rest } = props;
  const formItemClasses = jssStyle?.formItem?.() as FormItemClasses;
  const config = useConfig();
  const { semClass: formSemClass, semStyle: formSemStyle } = useContext(FormSemanticContext);
  const { Provider: FormItemContextProvider, ProviderValue, labelConfig, errors, showError, attributes } = useFormItem();
  const { labelWidth, labelAlign, labelVerticalAlign, inline, keepErrorHeight, keepErrorBelow, keepErrorAbove, colon } = {
    ...labelConfig,
    ...rest,
  };

  const [selfSemClass, selfSemStyle] = useSemantic<FormItemSemanticKey>(
    classNamesProp,
    stylesProp,
    config.formItem,
  );

  // 合并 Form Context 传递的 semantic 和自身的 semantic（自身优先）
  const semClass = (key: FormItemSemanticKey) => classNames(formSemClass?.(key), selfSemClass(key));
  const semStyle = (key: FormItemSemanticKey) => {
    const fromForm = formSemStyle?.(key);
    const fromSelf = selfSemStyle(key);
    if (!fromForm && !fromSelf) return undefined;
    return { ...fromForm, ...fromSelf };
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

  const labelRef = useRef<HTMLDivElement>(null);
  const labelTipRef = useRef<HTMLDivElement>(null);
  let labelText = labelRef.current?.textContent;
  if(labelTipRef.current?.textContent) {
    labelText += ` (tip: ${labelTipRef.current?.textContent})`;
  }

  const renderError = () => {
    if(!showError) return null;
    let uniqueErrors = errors;
    if(errors.length > 1) {
      uniqueErrors = errors.filter((error, index, self) =>
        index === self.findIndex((t) => t.message === error.message)
      )
    }
    return (
      <div className={classNames(formItemClasses?.error, semClass('error'))} style={semStyle('error')}>
        {uniqueErrors.map((error, index) => (
          <div key={index}>{error && <ErrorTrans error={error} />}</div>
        ))}
      </div>
    )
  }

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
        },
        semClass('item'),
      )}
      {...attributes}
      style={semStyle('item') ? { ...style, ...semStyle('item') } : style}
    >
      {label !== undefined ? (
        <div
          ref={labelRef}
          className={classNames(
            formItemClasses?.label,
            {
              [formItemClasses?.labelLeft]: labelAlign === 'left',
              [formItemClasses?.labelWithColon]: colon,
              [formItemClasses?.labelWithTooltip]: label && typeof label === 'object' && 'tooltip' in label
            },
            semClass('label'),
          )}
          style={labelAlign !== 'top' || inline ? { width: labelWidth, ...semStyle('label') } : semStyle('label')}
        >
          {renderLabel()}
        </div>
      ) : null}
      <div
        className={classNames(formItemClasses?.control, semClass('control'))}
        style={semStyle('control')}
        {...util.getDataAttribute({ role: 'form-control' })}
      >
        <FormItemContextProvider value={{ ...ProviderValue, label: labelText }}>{children}</FormItemContextProvider>

        {keepErrorAbove && renderError()}

        {!!tip && (!showError || keepErrorBelow || keepErrorAbove) && <div ref={labelTipRef} className={classNames(formItemClasses?.tip, semClass('tip'))} style={semStyle('tip')}>{tip}</div>}

        {!keepErrorAbove && renderError()}
      </div>
    </div>
  );
};

export default FormItem;
