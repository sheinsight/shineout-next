import React from 'react';
import clsx from 'clsx';
import AnimationList from '../animation-list';
import AbsoluteList from '../absolute-list';
import { usePopup } from '@sheinx/hooks';
import Icons from '../icons';

import type { BreadcrumbJssStyle } from './breadcrumb.type';

interface ListProps {
  data: any[];
  maxHeight?: string | number;
  jssStyle?: BreadcrumbJssStyle;
  renderItem: (dataItem: any) => React.ReactNode;
}
const List = (props: ListProps) => {
  const classes = props.jssStyle?.breadcrumb?.();
  const { open, position, targetRef, popupRef, getTargetProps, closePop } = usePopup({
    disabled: false,
    trigger: 'hover',
    position: 'bottom',
    autoMode: 'menu',
    priorityDirection: 'vertical',
    mouseLeaveDelay: 200,
  });

  const renderList = (arr: any[]) => {
    return arr.map((item, index) => {
      return (
        <div key={index} className={classes?.itemWrapper}>
          <div className={clsx(classes?.dropdownItem)} onClick={closePop}>
            {props.renderItem(item)}
          </div>
        </div>
      );
    });
  };
  const targetProps = getTargetProps();
  const [first, ...rest] = props.data;
  return (
    <div ref={targetRef} {...targetProps} className={classes?.itemWithDrop}>
      {props.renderItem(first)}
      <div className={clsx(classes?.down, open && classes?.downOpen)}>{Icons.breadcrumb.DropdownArrow}</div>
      <AbsoluteList
        position={position}
        focus={open}
        parentElRef={targetRef}
        absolute={true}
        fixedWidth={'min'}
        popupElRef={popupRef}
        adjust={true}
      >
        <AnimationList
          className={clsx(classes?.dropdown)}
          type={'fade'}
          duration={'fast'}
          show={open}
          onRef={popupRef as any}
          animation={false}
          style={{ maxHeight: props.maxHeight, overflow: 'auto' }}
        >
          {renderList(rest)}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default List;
