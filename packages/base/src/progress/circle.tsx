import React from 'react';
import { ProgressProps } from './progress.type';
import classNames from 'classnames';
import Icons from '../icons';
import analyzeColor from './analyzeColor';
import { util } from '@sheinx/hooks';

const Circle = (props: ProgressProps) => {
  const {
    value = 0,
    type = 'info',
    color,
    strokeWidth = 4,
    size = 64,
    strokeLinecap = 'round',
    iconSize,
    success,
    animation = true,
  } = props;

  const progressClasses = props.jssStyle?.progress();
  const iconStyle = { width: iconSize, height: iconSize };

  const cx = size / 2;
  const cy = size / 2;

  const r = size / 2 - strokeWidth / 2;

  const showIcon = !!props.icon;

  const p = Math.PI * 2 * r;
  const dasharray = [p * (value! / 100), p * (1 - value! / 100)];
  const style = Object.assign({ width: size, height: size }, props.style);
  const width = value === 0 && strokeLinecap === 'round' ? 0 : strokeWidth;
  const objColor = color && typeof color === 'object';

  // Success circle calculation
  const successDasharray = success ? [p * (success.value / 100), p * (1 - success.value / 100)] : null;
  const successWidth = success && success.value === 0 && strokeLinecap === 'round' ? 0 : strokeWidth;
  const objSuccessColor = success?.color && typeof success.color === 'object';

  const mc = classNames(
    props.className,
    progressClasses?.rootClass,
    progressClasses?.circle,
    progressClasses?.wrapper,
    type === 'success' && progressClasses?.wrapperSuccess,
    type === 'info' && progressClasses?.wrapperInfo,
    type === 'warning' && progressClasses?.wrapperWarning,
    type === 'danger' && progressClasses?.wrapperDanger,
    animation === false && progressClasses?.noAnimation,
  );

  return (
    <div {...util.extractProps(props, 'mouse')} className={mc} style={style} >
      <svg viewBox={`0 0 ${size} ${size}`}>
        {objColor ? (
          <defs>
            <linearGradient id='progress-linear' x1='50%' x2='50%' y1='0%' y2='100%'>
              {analyzeColor(color).map((c) => (
                <stop key={c.pos} offset={c.pos} stopColor={c.color} />
              ))}
            </linearGradient>
          </defs>
        ) : null}
        {objSuccessColor && success?.color && typeof success.color === 'object' ? (
          <defs>
            <linearGradient id='progress-success-linear' x1='50%' x2='50%' y1='0%' y2='100%'>
              {analyzeColor(success.color).map((c) => (
                <stop key={c.pos} offset={c.pos} stopColor={c.color} />
              ))}
            </linearGradient>
          </defs>
        ) : null}
        <circle
          className={progressClasses?.circleBg}
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
          fill='transparent'
          style={{ stroke: props.background }}
        />
        <circle
          className={progressClasses?.circleFront}
          cx={cx}
          cy={cy}
          r={r}
          fill='transparent'
          style={{ stroke: objColor ? "url('#progress-linear')" : color }}
          strokeDasharray={dasharray as any}
          strokeLinecap={strokeLinecap}
          strokeWidth={width}
        />
        {success && successDasharray && (
          <circle
            className={progressClasses?.circleSuccess}
            cx={cx}
            cy={cy}
            r={r}
            fill='transparent'
            style={{ stroke: objSuccessColor ? "url('#progress-success-linear')" : (typeof success.color === 'string' ? success.color : undefined) }}
            strokeDasharray={successDasharray as any}
            strokeLinecap={strokeLinecap}
            strokeWidth={successWidth}
          />
        )}
      </svg>
      {!showIcon && props.children && (
        <div className={progressClasses?.content}>{props.children}</div>
      )}
      {showIcon && (
        <div className={progressClasses?.icon} style={iconStyle}>
          {type === 'info' && Icons.progress.InfoCircle}
          {type === 'warning' && Icons.progress.WarningCircle}
          {type === 'success' && Icons.progress.SuccessCircle}
          {type === 'danger' && Icons.progress.DangerCircle}
        </div>
      )}
    </div>
  );
};

export default Circle;
