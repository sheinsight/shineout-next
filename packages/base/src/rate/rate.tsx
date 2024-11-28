import classNames from 'classnames';
import React, { useState } from 'react';
import { RateProps } from './rate.type';
import Icons from '../icons';
import { useInputAble } from '@sheinx/hooks';
import useWithFormConfig from '../common/use-with-form-config';
import { useConfig } from '../config';

const Rate = (props0: RateProps) => {
  const props = useWithFormConfig(props0);
  const config = useConfig();
  const { size } = props0;
  const { max = 5, repeat = true, clearable = false } = props;
  const [hoverValue, setHoverValue] = useState<null | number>(null);
  const [animationIndex, setAnimationIndex] = useState<null | number>(null);
  const rateClasses = props.jssStyle?.rate?.();

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

    const isHalfChecked = props.allowHalf && showValue % 1 > 0 && index === currentIndex;
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

    return (
      <div
        key={index}
        className={classNames(
          rateClasses?.item,
          isHalfChecked && rateClasses?.itemCheckedHalf,
          isChecked && rateClasses?.itemChecked,
          props.disabled && rateClasses?.itemDisabled,
          showAnimation && rateClasses?.itemAnimation,
        )}
        style={{
          fontSize: size,
          width: size,
          animationDelay: showAnimation ? `${50 * index}ms` : undefined,
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
        {props.allowHalf && (
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
      className={classNames(props.className, rateClasses?.wrapper)}
      style={props.style}
      onMouseLeave={() => {
        setHoverValue(null);
      }}
    >
      <div className={rateClasses?.inner}>
        {Array.from({ length: max }).map((_, index) => {
          return renderIcon(index);
        })}
        {text && <div className={rateClasses?.text}>{text}</div>}
      </div>
    </div>
  );
};

export default Rate;
