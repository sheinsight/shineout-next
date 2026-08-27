import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { RateProps, RateSemanticKey } from './rate.type';
import Icons from '../icons';
import { getDataset, useInputAble } from '@sheinx/hooks';
import useWithFormConfig from '../common/use-with-form-config';
import { useConfig } from '../config';
import { FormFieldContext } from '../form/form-field-context';
import { useSemantic } from '../common/use-semantic';

const Rate = (props0: RateProps) => {
  const props = useWithFormConfig(props0);
  const config = useConfig();
  const { fieldId } = useContext(FormFieldContext);
  const { size } = props0;
  const { max = 5, repeat = true, clearable = false, classNames: classNamesProp, styles: stylesProp } = props;
  const [hoverValue, setHoverValue] = useState<null | number>(null);
  const [animationIndex, setAnimationIndex] = useState<null | number>(null);
  const rateClasses = props.jssStyle?.rate?.();

  const [semClass, semStyle] = useSemantic<RateSemanticKey>(
    classNamesProp,
    stylesProp,
    config.rate,
  );

  const { value = 0, onChange } = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    control: 'value' in props,
    beforeChange: props.beforeChange,
  });

  const renderIcon = (index: number) => {
    const front = props.front ?? Icons.rate.Star;
    const back = props.background ?? Icons.rate.Star;

    const showValue = hoverValue === null ? value : hoverValue;

    const currentIndex = Math.ceil(showValue) - 1;

    const frontItem = Array.isArray(front) ? front[repeat ? currentIndex : index] : front;
    const backItem = Array.isArray(back) ? back[index] : back;

    const isHalfChecked = (props.allowHalf || props.disabled) && showValue % 1 > 0 && index === currentIndex;
    const isChecked = !isHalfChecked && index <= currentIndex;

    const handleChange = (val: number) => {
      if (clearable && value === val) {
        onChange(0);
        setHoverValue(null);
      } else {
        setAnimationIndex(Math.ceil(val) - 1);
        onChange(val);
      }
    };

    const showAnimation = animationIndex && index < currentIndex;

    // 只读状态下支持 0.6 这样的小数显示具体百分比的半颗星，而非固定的 50% 半星显示
    const halfStyle = props.disabled && value % 1 > 0 ? {
      width: value % 1 * 100 + '%',
    } : undefined;

    return (
      <div
        key={index}
        className={classNames(
          rateClasses?.item,
          isHalfChecked && rateClasses?.itemCheckedHalf,
          isChecked && rateClasses?.itemChecked,
          props.disabled && rateClasses?.itemDisabled,
          showAnimation && rateClasses?.itemAnimation,
          semClass('star'),
        )}
        style={{
          fontSize: size,
          width: size,
          animationDelay: showAnimation ? `${50 * index}ms` : undefined,
          ...semStyle('star'),
        }}
        onAnimationEnd={() => {
          setAnimationIndex(null);
        }}
      >
        <span className={rateClasses?.itemBg}>{backItem}</span>
        <span
          onMouseEnter={
            !props.disabled
              ? () => {
                  setHoverValue(index + 1);
                }
              : undefined
          }
          className={rateClasses?.itemFront}
          onClick={
            !props.disabled
              ? () => {
                  handleChange(index + 1);
                }
              : undefined
          }
        >
          {frontItem}
        </span>
        {(props.allowHalf || props.disabled) && (
          <span
            onMouseEnter={
              !props.disabled
                ? () => {
                    setHoverValue(index + 0.5);
                  }
                : undefined
            }
            onClick={
              !props.disabled
                ? () => {
                    handleChange(index + 0.5);
                  }
                : undefined
            }
            className={rateClasses?.itemHalf}
            style={halfStyle}
            dir={config.direction}
          >
            {frontItem}
          </span>
        )}
      </div>
    );
  };

  const text = Array.isArray(props.text) && props.text[Math.ceil(value - 1)];
  return (
    <div
      className={classNames(props.className, rateClasses?.rootClass, rateClasses?.wrapper, semClass('root'))}
      id={fieldId}
      style={props.style ? { ...props.style, ...semStyle('root') } : semStyle('root')}
      onMouseLeave={() => {
        setHoverValue(null);
      }}
      {...getDataset(props)}
    >
      <div className={rateClasses?.inner}>
        {Array.from({ length: max }).map((_, index) => {
          return renderIcon(index);
        })}
        {text && <div className={classNames(rateClasses?.text, semClass('text'))} style={semStyle('text')}>{text}</div>}
      </div>
    </div>
  );
};

export default Rate;
