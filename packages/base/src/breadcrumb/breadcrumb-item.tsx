import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BreadcrumbClasses, BreadcrumbDataType, BreadcrumbJssStyle } from './breadcrumb.type';
import Popover from '../popover';

interface BreadcrumbItemProps<Item = BreadcrumbDataType> {
  dataItem: Item;
  renderItem?: (dataItem: Item) => ReactNode;
  jssStyle?: BreadcrumbJssStyle;
  max?: number;
}

const BreadcrumbItem = <Item = BreadcrumbDataType,>({dataItem, renderItem, jssStyle, max}: BreadcrumbItemProps<Item>): ReactNode => {
  const contentRef = useRef<HTMLElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    if (contentRef.current && max !== undefined) {
      setIsOverflow(contentRef.current.offsetWidth > 150);
    }
  }, [max, dataItem])

  const breadcrumbClasses = jssStyle?.breadcrumb?.() as BreadcrumbClasses;
  const contentClass = classNames(breadcrumbClasses.content, isOverflow && breadcrumbClasses?.contentMaxWidth);

  const d = dataItem as BreadcrumbDataType;
  let item = d.title;

  let $popover
  if(isOverflow && d.title && max !== undefined) {
    $popover = (
      <Popover jssStyle={jssStyle} useTextStyle>
        {d.title}
      </Popover>
    )
  }

  if (!React.isValidElement(item)) {
    if (d.onClick || d.url) {
      const props: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        onClick: d.onClick,
      };
      if (d.url) props.href = d.url;
      item = (
        <a {...props} className={contentClass} role="button" ref={contentRef as any}>
          {d.icon}
          {d.icon && d.title && <>&nbsp;</>}
          {d.title}

          {$popover}
        </a>
      );
    } else {
      item = (
        <span className={contentClass} ref={contentRef}>
          {d.icon}
          {d.icon && d.title && <>&nbsp;</>}
          {d.title}

          {$popover}
        </span>
      );
    }
  }
  return renderItem ? renderItem(dataItem) : item;
};

export default BreadcrumbItem;
