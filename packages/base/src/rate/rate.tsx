import classNames from 'classnames';
import React, { useState } from 'react';
import { RateProps } from './rate.type';
import Icons from '../icons';
import { useInputAble } from '@sheinx/hooks';
import useWithFormConfig from '../common/use-with-form-config';

const Rate = (props0: RateProps) => {
  const props = useWithFormConfig(props0);
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
    const front = props.front ?? Icons.PcStarFill;
    const back = props.background ?? Icons.PcStarFill;

    const showValue = hoverValue === null ? value : hoverValue;

    const currentIndex = Math.ceil(showValue) - 1;

    const frontItem = Array.isArray(front) ? front[repeat ? currentIndex : index] : front;
    const backItem = Array.isArray(back) ? back[index] : back;

    const isHalfChecked = props.allowHalf && showValue % 1 > 0 && index === currentIndex;
    const isChecked = !isHalfChecked && index <= currentIndex;

    const itemStyle = {
      fontSize: size,
      width: size,
    };
    const handleChange = (val: number) => {
      if (clearable && value === val) {
        onChange(0);
        setHoverValue(null);
      } else {
        setAnimationIndex(Math.ceil(val) - 1);
        onChange(val);
      }
    };

    return (
      <div
        key={index}
        className={classNames(
          rateClasses?.item,
          isHalfChecked && rateClasses?.itemCheckedHalf,
          isChecked && rateClasses?.itemChecked,
          props.disabled && rateClasses?.itemDisabled,
          animationIndex === index && rateClasses?.itemAnimation,
        )}
        onAnimationEnd={() => {
          setAnimationIndex(null);
        }}
        style={itemStyle}
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
