import React from 'react';
import classNames from 'classnames';
import { CollapseProps, CollapseSemanticKey } from './collapse.type';
import groupContext from './group-context';
import Icons from '../icons';
import { useCollapse } from '@sheinx/hooks';
import { useConfig } from '../config';
import { useSemantic } from '../common';

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
    simple: simpleProp = false,
    classNames: classNamesProp,
    styles: stylesProp,
  } = props;

  const { active, onChange } = useCollapse({
    defaultActive,
    active: activeProps,
    accordion,
    onChange: onChangeProps,
  });

  // Semantic DOM
  const config = useConfig();
  const [semClass, semStyle] = useSemantic<CollapseSemanticKey>(
    classNamesProp,
    stylesProp,
    config.collapse,
  );

  const collapseRootClassName = classNames(
    className,
    jssStyle?.collapse?.rootClass,
    jssStyle?.collapse?.wrapper,
    !border && jssStyle?.collapse?.borderLess,
    semClass('root'),
  );

  const providerValue = {
    active,
    triggerRegion,
    expandIconPosition,
    extraPosition,
    border,
    animation,
    simple: simpleProp,
    expandIcon:
      expandIcon !== undefined
        ? expandIcon
        : expandIconPosition === 'right'
        ? Icons.collapse.collapseArrow
        : Icons.collapse.collapseArrow,
    onChange,
    semClass,
    semStyle,
  };
  return (
    <groupContext.Provider value={providerValue}>
      <div className={collapseRootClassName} style={{ ...style, ...semStyle('root') }}>
        {children}
      </div>
    </groupContext.Provider>
  );
};

export default Collapse;
