import React from 'react';
import { ProgressProps } from './progress.type';
import classNames from 'classnames';
import analyzeColor from './analyzeColor';
import Popup from './line-popup';
import Icons from '../icons';

const Line = (props: ProgressProps) => {
  const { shape = 'line', value = 0, type = 'info', iconSize } = props;

  const progressClasses = props.jssStyle?.progress();

  const isInner = shape === 'line-inner';
  const isInnerRight = isInner && value < 10;
  const isDefault = shape === 'line' || shape === 'line-pop';
  const isDefaultPop = shape === 'line-pop';

  const iconStyle = { width: iconSize, height: iconSize };

  const mc = classNames(
    props.className,
    progressClasses?.line,
    progressClasses?.wrapper,
    type === 'success' && progressClasses?.wrapperSuccess,
    type === 'info' && progressClasses?.wrapperInfo,
    type === 'warning' && progressClasses?.wrapperWarning,
    type === 'danger' && progressClasses?.wrapperDanger,
    isDefault && progressClasses?.lineDefault,
    isDefaultPop && progressClasses?.linePop,
    isInner && progressClasses?.lineInner,
    isInnerRight && progressClasses?.lineInnerRight,
  );

  const bgStyle: React.CSSProperties = {
    height: props.strokeWidth,
    background: props.background,
    borderRadius: props.strokeWidth && props.strokeWidth / 2,
  };

  const frontStyle: React.CSSProperties = {
    width: `${(value! / 100) * 100}%`,
    borderRadius: props.strokeWidth && props.strokeWidth / 2,
  };

  if (typeof props.color === 'string') {
    frontStyle.background = props.color;
    frontStyle.backgroundSize = '1em 1em';
  } else if (typeof props.color === 'object') {
    frontStyle.background = `linear-gradient(to right, ${analyzeColor(props.color).reduce(
      (p, v) => {
        const col = `${v.color} ${v.pos}`;
        return p ? `${p},${col}` : col;
      },
      '',
    )})`;
  }

  const children = props.children ? (
    <div className={classNames(progressClasses?.content)}>{props.children}</div>
  ) : null;

  return (
    <div className={mc} style={props.style}>
      <div className={progressClasses?.lineBg} style={bgStyle}>
        <div className={progressClasses?.lineFront} style={frontStyle}>
          {isInner && children}
        </div>
      </div>
      {isDefaultPop ? (
        <Popup value={value} jssStyle={props.jssStyle}>
          {props.children}
        </Popup>
      ) : null}
      {shape === 'line' && children}
      {!!props.icon && (
        <div className={progressClasses?.icon} style={iconStyle}>
          {type === 'info' && Icons.PcInfoCircleFill}
          {type === 'warning' && Icons.PcInfoCircleFill}
          {type === 'success' && Icons.PcCheckCircleFill}
          {type === 'danger' && Icons.PcCloseCircleFill}
        </div>
      )}
    </div>
  );
};

export default Line;
