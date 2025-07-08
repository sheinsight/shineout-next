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

  const renderItem = (dataItem: Item): ReactNode => {
    return <BreadcrumbItem dataItem={dataItem} renderItem={props.renderItem} jssStyle={props.jssStyle} max={props.max} />
  };

  const renderArray = (data: StructureArray<Item>) => {
    return <List data={data} renderItem={renderItem} jssStyle={props.jssStyle} maxHeight={maxHeight} />;
  };
  const className = classNames(breadcrumbClasses?.rootClass, breadcrumbClasses?.wrapper, props.className);

  const getRenderData = () => {
    if (!props.max) return data;
    if (data.length <= props.max) return data;
    const first = data[0];
    const sliceIndex = data.length - props.max + 1;
    const reset = data.slice(sliceIndex);
    const moreData = data.slice(1, sliceIndex);
    const more = {
      title: (
        <span className={classNames(breadcrumbClasses?.content, breadcrumbClasses?.ellipsis)}>
          ...
          <Popover jssStyle={props.jssStyle} useTextStyle offset={[8, 0]} popupGap={-4}>
            <Breadcrumb {...props} data={moreData} max={undefined} />
          </Popover>
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
              {Array.isArray(d) ? renderArray(d) : <BreadcrumbItem dataItem={d as Item} renderItem={renderItem} jssStyle={props.jssStyle} max={props.max} />}
              {!isLastItem && <div className={breadcrumbClasses?.separator}>{separator}</div>}
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
