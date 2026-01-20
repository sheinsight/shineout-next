import React from 'react';
import { ProgressProps } from './progress.type';
import classNames from 'classnames';
import analyzeColor from './analyzeColor';
import Popup from './line-popup';
import Icons from '../icons';
import { util } from '@sheinx/hooks';

const Line = (props: ProgressProps) => {
  const { shape = 'line', value = 0, type = 'info', iconSize, popup, success, animation = true } = props;

  const progressClasses = props.jssStyle?.progress();

  const isInner = shape === 'line-inner';
  const isInnerRight = isInner && value < 10;
  const isDefault = shape === 'line' || shape === 'line-pop';
  const isDefaultPop = shape === 'line-pop' || popup;

  const iconStyle = { width: iconSize, height: iconSize };

  const mc = classNames(
    props.className,
    progressClasses?.rootClass,
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
    animation === false && progressClasses?.noAnimation,
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

  // Success progress bar style
  const successStyle: React.CSSProperties | undefined = success ? {
    width: `${(success.value / 100) * 100}%`,
    borderRadius: props.strokeWidth && props.strokeWidth / 2,
  } : undefined;

  if (successStyle && success) {
    if (typeof success.color === 'string') {
      successStyle.background = success.color;
      successStyle.backgroundSize = '1em 1em';
    } else if (typeof success.color === 'object') {
      successStyle.background = `linear-gradient(to right, ${analyzeColor(success.color).reduce(
        (p, v) => {
          const col = `${v.color} ${v.pos}`;
          return p ? `${p},${col}` : col;
        },
        '',
      )})`;
    }
  }

  const children = props.children ? (
    <div className={classNames(progressClasses?.content)}>{props.children}</div>
  ) : null;

  return (
    <div {...util.extractProps(props, 'mouse')}  className={mc} style={props.style}>
      <div className={progressClasses?.lineBg} style={bgStyle}>
        {success && successStyle && (
          <div className={progressClasses?.lineSuccess} style={successStyle} />
        )}
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
          {type === 'info' && Icons.progress.InfoLine}
          {type === 'warning' && Icons.progress.WarningLine}
          {type === 'success' && Icons.progress.SuccessLine}
          {type === 'danger' && Icons.progress.DangerLine}
        </div>
      )}
    </div>
  );
};

export default Line;
