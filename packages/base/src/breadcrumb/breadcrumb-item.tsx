import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BreadcrumbClasses, BreadcrumbDataType, BreadcrumbJssStyle } from './breadcrumb.type';
import Tooltip from '../tooltip';

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
        </a>
      );
    } else {
      item = (
        <span className={contentClass} ref={contentRef}>
          {d.icon}
          {d.icon && d.title && <>&nbsp;</>}
          {d.title}
        </span>
      );
    }
  }
  if(renderItem) {
    return renderItem(dataItem);
  }

  if(isOverflow && d.title && max !== undefined) {
    return <Tooltip jssStyle={jssStyle} type='light' tip={d.title}>{item}</Tooltip>;
  }

  return item;
};

export default BreadcrumbItem;
