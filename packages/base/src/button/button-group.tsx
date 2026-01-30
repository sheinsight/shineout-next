import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { useConfig } from '../config';
import { ButtonClasses, ButtonGroupProps, ButtonProps } from './button.type';
import { util } from '@sheinx/hooks';

const { devUseWarning } = util;

const Group = (props: ButtonGroupProps) => {
  const { children, className, style, jssStyle, size, mode, outline, text, shape, type } = props;
  const config = useConfig();

  if (outline) {
    devUseWarning.deprecated('outline', 'mode="outline"', 'Button.Group');
  }
  if (text) {
    devUseWarning.deprecated('text', 'mode="text"', 'Button.Group');
  }

  const modeSetted = mode || (text ? 'text' : outline ? 'outline' : undefined);
  const buttonStyle = jssStyle?.button?.() || ({} as ButtonClasses);
  const groupClass = classNames(
    className,
    buttonStyle?.group,
    shape === 'round' && buttonStyle.round,
    size === 'small' && buttonStyle.small,
    size === 'large' && buttonStyle.large,
  );

  const shapeSetted = shape === 'round' ? 'round' : undefined;

  return (
    <div className={groupClass} style={style} dir={config.direction} id={props.id}>
      {Children.toArray(children).map((child) => {
        const Child = child as React.ReactElement<ButtonProps>;
        return cloneElement<ButtonProps>(Child, {
          size,
          mode: modeSetted || Child.props.mode,
          shape: shapeSetted || Child.props.shape,
          type: Child.props.type || type,
          className: classNames(Child.props.className),
        });
      })}
    </div>
  );
};

export default Group;
