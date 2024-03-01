import { useSlider, useInputAble } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SliderProps } from './slider.type';
import useWithFormConfig from '../common/use-with-form-config';


const defaultScale = [0, 100];
const Slider = <Value extends number | number[]>(props0: SliderProps<Value>) => {
  const props = useWithFormConfig(props0);
  const sliderClasses = props.jssStyle?.slider?.();

  const { scale = defaultScale, step = 1, height = 200, valueTipType: tipType = 'always' } = props;

  const inputAbleInfo = useInputAble({
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    beforeChange: props.beforeChange,
    control: 'value' in props,
  });

  const { func, trackRef, innerStyle, dragIndex, startValue, endValue } = useSlider({
    range: !!props.range,
    value: inputAbleInfo.value,
    onChange: inputAbleInfo.onChange,
    scale,
    step,
    vertical: !!props.vertical,
    onIncrease: props.onIncrease,
  });

  const renderIndicatorValue = (position: 0 | 1) => {
    if (props.formatValue === false) return null;
    const value = position === 0 ? startValue : endValue;
    let formated: React.ReactNode = value;
    if (typeof props.formatValue === 'function') {
      formated = props.formatValue(value);
    }
    const c = position === 0 ? sliderClasses?.startValue : sliderClasses?.endValue;
    return (
      <div
        className={classNames(
          c,
          sliderClasses?.value,
          tipType === 'hover' && sliderClasses?.valueHover,
        )}
      >
        {formated}
      </div>
    );
  };

  const renderIndicator = (position: 0 | 1) => {
    if (!props.range && position === 0) return null;
    const handleEndMouseDown = position === 0 ? func.handleStartMouseDown : func.handleEndMouseDown;
    return (
      <>
        <div
          onMouseDown={props.disabled ? undefined : handleEndMouseDown}
          className={classNames(
            sliderClasses?.indicator,
            position === 0 ? sliderClasses?.indicatorStart : sliderClasses?.indicatorEnd,
            dragIndex === position && sliderClasses?.indicatorActive,
            tipType === 'hover' && sliderClasses?.indicatorHover,
          )}
        />
        {renderIndicatorValue(position)}
      </>
    );
  };

  const renderScale = (value: number) => {
    if (props.formatScale === false) return null;
    if (typeof props.formatScale === 'function') {
      return props.formatScale(value);
    }
    return value;
  };

  const verticalStyle = props.vertical ? { height } : {};

  return (
    <div
      className={classNames(
        sliderClasses?.wrapper,
        props.autoHide && sliderClasses?.autoHide,
        props.disabled && sliderClasses?.disabled,
        props.vertical && sliderClasses?.vertical,
        props.className,
      )}
      style={{
        ...verticalStyle,
        ...props.style,
      }}
    >
      <div
        className={sliderClasses?.track}
        ref={trackRef}
        onClick={props.disabled ? undefined : func.handleTrackClick}
      >
        <div className={sliderClasses?.trackInner} style={innerStyle}>
          {renderIndicator(0)}
          {renderIndicator(1)}
        </div>
      </div>
      {props.formatScale === false ? null : (
        <div className={sliderClasses?.scaleWrapper}>
          {scale?.map((item, index) => (
            <div key={index} className={classNames(sliderClasses?.scale)}>
              <div key={index} className={classNames(sliderClasses?.label)}>
                {renderScale(item)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
