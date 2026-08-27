import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BreadcrumbClasses, BreadcrumbDataType, BreadcrumbJssStyle, BreadcrumbSemanticKey } from './breadcrumb.type';
import Tooltip from '../tooltip';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

interface BreadcrumbItemProps<Item = BreadcrumbDataType> {
  dataItem: Item;
  renderItem?: (dataItem: Item) => ReactNode;
  jssStyle?: BreadcrumbJssStyle;
  max?: number;
  semClass: SemanticClassFn<BreadcrumbSemanticKey>;
  semStyle: SemanticStyleFn<BreadcrumbSemanticKey>;
}

const BreadcrumbItem = <Item = BreadcrumbDataType,>({dataItem, renderItem, jssStyle, max, semClass, semStyle}: BreadcrumbItemProps<Item>): ReactNode => {
  const contentRef = useRef<HTMLElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    if (contentRef.current && max !== undefined) {
      setIsOverflow(contentRef.current.offsetWidth > 150);
    }
  }, [max, dataItem])

  const breadcrumbClasses = jssStyle?.breadcrumb?.() as BreadcrumbClasses;
  const contentClass = classNames(breadcrumbClasses.content, isOverflow && breadcrumbClasses?.contentMaxWidth, semClass('content'));
  const contentStyle = semStyle('content');

  const d = dataItem as BreadcrumbDataType;
  let item = d.title;

  if (!React.isValidElement(item)) {
    if (d.onClick || d.url) {
      const props: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        onClick: d.onClick,
      };
      if (d.url) props.href = d.url;
      item = (
        <a {...props} className={contentClass} style={contentStyle} role="button" ref={contentRef as any}>
          {d.icon}
          {d.icon && d.title && <>&nbsp;</>}
          {d.title}
        </a>
      );
    } else {
      item = (
        <span className={contentClass} style={contentStyle} ref={contentRef}>
          {d.icon}
          {d.icon && d.title && <>&nbsp;</>}
          {d.title}
        </span>
      );
    }
  }
  if(renderItem) {
    if (max !== undefined) {
      item = <span className={contentClass} style={contentStyle} ref={contentRef}>
        {renderItem(dataItem)}
      </span>
    } else {
      return renderItem(dataItem);
    }
  }

  if(isOverflow && d.title && max !== undefined) {
    return <Tooltip jssStyle={jssStyle} type='light' tip={d.title}>{item}</Tooltip>;
  }

  return item;
};

export default BreadcrumbItem;
