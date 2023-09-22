import React from 'react';
import classNames from 'classnames';
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
    lazyload = true,
    destroyOnHide = false,
    expandContentPosition = 'left',
    expandContent,
    border = true,
  } = props;

  const { active, onChange } = useCollapse({
    defaultActive,
    active: activeProps,
    accordion,
    onChange: onChangeProps,
  });

  const collapseRootClassName = classNames(
    className,
    jssStyle?.collapse.wrapper,
    !border && jssStyle?.collapse.borderLess,
  );

  const providerValue = {
    active,
    triggerRegion,
    lazyload,
    destroyOnHide,
    expandContentPosition,
    expandIcon:
      expandContent !== undefined
        ? expandContent
        : expandContentPosition === 'right'
        ? Icons.AngleLeft
        : Icons.AngleRight,
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
