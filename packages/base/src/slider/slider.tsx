// import { } from '@sheinx/hooks';
// import classNames from 'classnames';
import React from 'react';
import { SliderProps } from './slider.type';

const Slider = <Value extends number | number[]>(props: SliderProps<Value>) => {
  const sliderClasses = props.jssStyle?.slider?.();
  const {} = props;

  return (
    <div className={sliderClasses?.wrapper}>
      <div className={sliderClasses?.trunck}>
        <div className={sliderClasses?.trunckInner}>
          <div className={sliderClasses?.indicator} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
