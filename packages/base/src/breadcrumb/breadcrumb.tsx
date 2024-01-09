import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import React, { ReactNode } from 'react';
import { BreadcrumbProps, StructureArray, BreadcrumbDataType } from './breadcrumb.type';
import List from './list';

const { getKey } = util;
const Breadcrumb = <Item = BreadcrumbDataType,>(props: BreadcrumbProps<Item>) => {
  const { data = [], separator = '/' } = props;
  const breadcrumbClasses = props.jssStyle?.breadcrumb?.();
  // ...

  const renderItem = (dataItem: Item): ReactNode => {
    const d = dataItem as BreadcrumbDataType;
    let item = d.title;
    if (!React.isValidElement(item)) {
      if (d.onClick || d.url) {
        const props: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
          onClick: d.onClick,
        };
        if (d.url) props.href = d.url;
        item = (
          <a {...props} className={breadcrumbClasses?.content}>
            {d.icon}
            {d.icon && d.title && <>&nbsp;</>}
            {d.title}
          </a>
        );
      } else {
        item = (
          <span className={breadcrumbClasses?.content}>
            {d.icon}
            {d.icon && d.title && <>&nbsp;</>}
            {d.title}
          </span>
        );
      }
    }
    return props.renderItem ? props.renderItem(dataItem) : item;
  };

  const renderArray = (data: StructureArray<Item>) => {
    return <List data={data} renderItem={renderItem} jssStyle={props.jssStyle} />;
  };
  const className = classNames(breadcrumbClasses?.wrapper, props.className);

  const getRenderData = () => {
    if (!props.max) return data;
    if (data.length <= props.max) return data;
    const first = data[0];
    const reset = data.slice(data.length - props.max + 1);
    const more = {
      title: (
        <span className={classNames(breadcrumbClasses?.content, breadcrumbClasses?.ellipsis)}>
          ...
        </span>
      ),
    };
    return [first, more, ...reset];
  };

  return (
    <div className={className} style={props.style}>
      {data &&
        getRenderData().map((d, index) => {
          const itemFirst = Array.isArray(d) ? d[0] : d;
          const isLastItem = index === (props.max !== undefined ? props.max : data.length - 1);
          return (
            <div
              className={breadcrumbClasses?.item}
              key={props.keygen ? getKey(props.keygen, itemFirst as Item, index) : index}
            >
              {Array.isArray(d) ? renderArray(d) : renderItem(d as Item)}
              {!isLastItem && <div className={breadcrumbClasses?.separator}>{separator}</div>}
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
