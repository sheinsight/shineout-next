import React from 'react';
import { useConfig } from '../config';
import { ProgressProps } from './progress.type';

const ROTATE_MAX_ANGLE = 15;
const PROGRESS_CENTER = 60;

const LinePopUp = (props: {
  value: number;
  children?: React.ReactNode;
  jssStyle?: ProgressProps['jssStyle'];
}) => {
  const config = useConfig();
  const isRtl = config.direction === 'rtl';
  const progressClasses = props.jssStyle?.progress?.();

  const getStyle = () => {
    const { value } = props;
    let rotate = 0;
    if (value! <= PROGRESS_CENTER) rotate = ROTATE_MAX_ANGLE * (value! / PROGRESS_CENTER);
    else rotate = (1 - value! / 100) * ROTATE_MAX_ANGLE;
    return {
      [isRtl ? 'right' : 'left']: `${value}%`,
      transform: `translateX(${isRtl ? '50%' : '-50%'}) rotate(${rotate}deg)`,
    };
  };

  return (
    <div className={progressClasses?.linePopWrapper} style={getStyle()}>
      <span className={progressClasses?.linePopValue}>{props.children}</span>
      <span className={progressClasses?.linePopArrow} />
    </div>
  );
};

export default LinePopUp;
