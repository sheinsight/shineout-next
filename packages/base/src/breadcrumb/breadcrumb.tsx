import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import React, { ReactNode } from 'react';
import { BreadcrumbProps, StructureArray, BreadcrumbDataType, BreadcrumbClasses } from './breadcrumb.type';
import List from './list';
import BreadcrumbItem from './breadcrumb-item';
import Popover from '../popover';

const { getKey } = util;
const Breadcrumb = <Item = BreadcrumbDataType,>(props: BreadcrumbProps<Item>) => {
  const { data = [], separator = '/', maxHeight = '50vh' } = props;
  const breadcrumbClasses = props.jssStyle?.breadcrumb?.() as BreadcrumbClasses;
  const maxCount = props.max ? Math.max(2, props.max) : undefined

  const renderItem = (dataItem: Item): ReactNode => {
    return <BreadcrumbItem dataItem={dataItem} renderItem={props.renderItem} jssStyle={props.jssStyle} max={maxCount} />
  };

  const renderArray = (data: StructureArray<Item>) => {
    return <List data={data} renderItem={renderItem} jssStyle={props.jssStyle} maxHeight={maxHeight} />;
  };
  const className = classNames(breadcrumbClasses?.rootClass, breadcrumbClasses?.wrapper, props.className);

  const getRenderData = () => {
    if (!maxCount) return data;
    if (data.length <= maxCount) return data;
    const first = data[0];
    const sliceIndex = data.length - maxCount + 1;
    const reset = data.slice(sliceIndex);
    const moreData = data.slice(1, sliceIndex);

    const moreClassName = classNames(props.className, breadcrumbClasses.wrapperPopover);
    const more = {
      title: (
        <span className={classNames(breadcrumbClasses?.content, breadcrumbClasses?.ellipsis)}>
          ...
          <Popover jssStyle={props.jssStyle} useTextStyle offset={[8, 0]} popupGap={-4}>
            <Breadcrumb {...props} className={moreClassName} data={moreData} max={undefined} />
          </Popover>
        </span>
      ),
    };
    return [first, more, ...reset];
  };

  const lastIndex = Math.min(data.length - 1, (maxCount !== undefined ? maxCount : data.length - 1));
  return (
    <div className={className} style={props.style}>
      {data &&
        getRenderData().map((d, index) => {
          const itemFirst = Array.isArray(d) ? d[0] : d;
          const isLastItem = index === lastIndex;
          return (
            <div
              className={breadcrumbClasses?.item}
              key={props.keygen ? getKey(props.keygen, itemFirst as Item, index) : index}
            >
              {Array.isArray(d) ? renderArray(d) : <BreadcrumbItem dataItem={d as Item} renderItem={props.renderItem} jssStyle={props.jssStyle} max={maxCount} />}
              {!isLastItem && <div className={breadcrumbClasses?.separator}>{separator}</div>}
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
