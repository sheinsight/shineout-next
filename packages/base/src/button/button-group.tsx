import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { ButtonGroupClasses, ButtonGroupProps } from './button-group.type';
import { ButtonProps } from './button.type';

const Group = (props: ButtonGroupProps) => {
  const { children, className, style, jssStyle, size, mode, outline, text, shape, type } = props;

  if (outline || text) {
    console.warn(
      '[Button / Button.Group] The properties outline, and text are being deprecated and you should use the mode property to specify the style of the button instead.',
    );
  }

  const modeSetted = mode || (text ? 'text' : outline ? 'outline' : undefined);
  const groupStyle = jssStyle?.buttonGroup || ({} as ButtonGroupClasses);

  const groupClass = classNames(
    className,
    groupStyle?.group,
    groupStyle[type || 'default'],
    modeSetted === 'text' && groupStyle.text,
    modeSetted === 'dashed' && groupStyle.dashed,
    modeSetted === 'outline' && groupStyle.outline,
    shape === 'round' && groupStyle.round,
    size === 'small' && groupStyle.small,
    size === 'large' && groupStyle.large,
  );

  const shapeSetted = shape === 'round' ? 'round' : undefined;

  return (
    <div className={groupClass} style={style}>
      {Children.toArray(children).map((child) => {
        const Child = child as React.ReactElement<ButtonProps>;

        return cloneElement<ButtonProps>(Child, {
          size,
          mode: modeSetted,
          shape: shapeSetted,
          type: Child.props.type || type,
        });
      })}
    </div>
  );
};

export default Group;
