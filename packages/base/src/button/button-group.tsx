import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { ButtonGroupProps } from './button-group.type';
import { ButtonProps } from './button.type';

const Group = (props: ButtonGroupProps) => {
  const { children, className, style, jssStyle, size, outline, text, shape, dash, type } = props;

  const groupClass = classNames(className, jssStyle.group, jssStyle[type || 'default'], {
    [jssStyle.outline]: outline,
    [jssStyle.text]: text,
    [jssStyle.dash]: dash,
    [jssStyle.round]: shape === 'round',
    [jssStyle.small]: size === 'small',
    [jssStyle.large]: size === 'large',
  });

  const shapeSetted = shape === 'round' ? 'round' : undefined;

  return (
    <div className={groupClass} style={style}>
      {Children.toArray(children).map((child) => {
        const Child = child as React.ReactElement<ButtonProps>;

        return cloneElement<ButtonProps>(Child, {
          size,
          dash,
          text,
          outline,
          shape: shapeSetted,
          // type: type ? type : Child.props.type,
          type: Child.props.type || type,
        });
      })}
    </div>
  );
};

export default Group;
