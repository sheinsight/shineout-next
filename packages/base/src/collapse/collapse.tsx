import React from 'react';
import classNames from 'classnames';
import { CollapseProps } from './collapse.type';
import groupContext from './group-context';
import Icons from '../icons';
import { useCollapse } from '@sheinx/hooks';

const Collapse = (props: CollapseProps) => {
  // TODO: 未实现嵌套
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
    lazyload,
    destroyOnHide,
    expandContentPosition,
    expandContent,
  } = props;

  const { active, onChange } = useCollapse({
    defaultActive,
    active: activeProps,
    accordion,
    onChange: onChangeProps,
  });

  const collapseRootClassName = classNames(className, jssStyle?.collapse.wrapper);

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
        ? Icons.AngleRight
        : Icons.AngleLeft,
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
