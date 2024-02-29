import React from 'react';
import classNames from 'classnames';
import AnimationList from '../animation-list';
import AbsoluteList from '../absolute-list';
import { usePopup } from '@sheinx/hooks';
import Caret from '../icons/caret';

import type { BreadcrumbJssStyle } from './breadcrumb.type';

interface ListProps {
  data: any[];
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
        <div data-role='drop-item-wrapper' key={index} className={classes?.itemWrapper}>
          <div data-role='drop-item' className={classNames(classes?.dropdownItem)} onClick={closePop}>
            {props.renderItem(item)}
          </div>
        </div>
      );
    });
  };
  const targetProps = getTargetProps();
  const [first, ...rest] = props.data;
  return (
    <div data-role='drop' ref={targetRef} {...targetProps} className={classes?.itemWithDrop}>
      {props.renderItem(first)}
      <div data-role='icon' className={classNames(classes?.down, open && classes?.downOpen)}>{<Caret />}</div>
      <AbsoluteList
        position={position}
        focus={open}
        parentElement={targetRef.current}
        absolute={true}
        fixedWidth={'min'}
        popupEl={popupRef.current}
        adjust={true}
      >
        <AnimationList
          className={classNames(classes?.dropdown)}
          type={'fade'}
          duration={'fast'}
          show={open}
          onRef={popupRef as any}
          animation
        >
          {renderList(rest)}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default List;
