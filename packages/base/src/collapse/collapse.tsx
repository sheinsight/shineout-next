import React from 'react';
import clsx from 'clsx';
import { CollapseProps } from './collapse.type';
import groupContext from './group-context';
import Icons from '../icons';
import { useCollapse } from '@sheinx/hooks';

const Collapse = (props: CollapseProps) => {
  const {
    children,
    jssStyle,
    style,
    className,
    defaultActive,
    active: activeProps,
    accordion = false,
    onChange: onChangeProps,
    triggerRegion,
    expandIconPosition = 'left',
    extraPosition = 'right',
    expandIcon,
    border = true,
    animation = true,
  } = props;

  const { active, onChange } = useCollapse({
    defaultActive,
    active: activeProps,
    accordion,
    onChange: onChangeProps,
  });

  const collapseRootClassName = clsx(
    className,
    jssStyle?.collapse?.rootClass,
    jssStyle?.collapse?.wrapper,
    !border && jssStyle?.collapse?.borderLess,
  );

  const providerValue = {
    active,
    triggerRegion,
    expandIconPosition,
    extraPosition,
    border,
    animation,
    expandIcon:
      expandIcon !== undefined
        ? expandIcon
        : expandIconPosition === 'right'
        ? // ? Icons.ArrowLeft
          Icons.collapse.collapseArrow
        : Icons.collapse.collapseArrow,
    onChange,
  };
  return (
    <groupContext.Provider value={providerValue}>
      <div className={collapseRootClassName} style={style}>
        {children}
      </div>
    </groupContext.Provider>
  );
};

export default Collapse;
