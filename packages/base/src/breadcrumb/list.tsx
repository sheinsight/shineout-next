import React from 'react';
import classNames from 'classnames';
import AnimationList from '../animation-list';
import AbsoluteList from '../absolute-list';
import { usePopup } from '@sheinx/hooks';
import Icons from '../icons';

import type { BreadcrumbJssStyle, BreadcrumbSemanticKey } from './breadcrumb.type';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

interface ListProps {
  data: any[];
  maxHeight?: string | number;
  jssStyle?: BreadcrumbJssStyle;
  renderItem: (dataItem: any) => React.ReactNode;
  semClass: SemanticClassFn<BreadcrumbSemanticKey>;
  semStyle: SemanticStyleFn<BreadcrumbSemanticKey>;
}
const List = (props: ListProps) => {
  const classes = props.jssStyle?.breadcrumb?.();
  const { semClass, semStyle } = props;
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
          <div className={classNames(classes?.dropdownItem, semClass('dropdownItem'))} style={semStyle('dropdownItem')} onClick={closePop}>
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
      <div className={classNames(classes?.down, open && classes?.downOpen)}>{Icons.breadcrumb.DropdownArrow}</div>
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
          className={classNames(classes?.dropdown, semClass('dropdown'))}
          type={'fade'}
          duration={'fast'}
          show={open}
          onRef={popupRef as any}
          animation={false}
          style={{ maxHeight: props.maxHeight, overflow: 'auto', ...semStyle('dropdown') }}
        >
          {renderList(rest)}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default List;
