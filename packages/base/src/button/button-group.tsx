import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { ButtonClasses, ButtonGroupProps, ButtonProps } from './button.type';

const Group = (props: ButtonGroupProps) => {
  const { children, className, style, jssStyle, size, mode, outline, text, shape, type } = props;

  if (outline || text) {
    console.warn(
      '[Button / Button.Group] The properties outline, and text are being deprecated and you should use the mode property to specify the style of the button instead.',
    );
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
    <div className={groupClass} style={style}>
      {Children.toArray(children).map((child) => {
        const Child = child as React.ReactElement<ButtonProps>;
        return cloneElement<ButtonProps>(Child, {
          size,
          mode: modeSetted || Child.props.mode,
          shape: shapeSetted,
          type: Child.props.type || type,
          className: classNames(Child.props.className),
        });
      })}
    </div>
  );
};

export default Group;
