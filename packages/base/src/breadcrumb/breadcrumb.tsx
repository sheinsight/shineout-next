import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import React, { ReactNode } from 'react';
import { BreadcrumbProps, StructureArray, BreadcrumbDataType, BreadcrumbClasses, BreadcrumbSemanticKey } from './breadcrumb.type';
import List from './list';
import BreadcrumbItem from './breadcrumb-item';
import Popover from '../popover';
import { useConfig } from '../config';
import { useSemantic } from '../common';

const { getKey } = util;
const Breadcrumb = <Item = BreadcrumbDataType,>(props: BreadcrumbProps<Item>) => {
  const {
    data = [],
    separator = '/',
    maxHeight = '50vh',
    classNames: classNamesProp,
    styles: stylesProp,
  } = props;
  const breadcrumbClasses = props.jssStyle?.breadcrumb?.() as BreadcrumbClasses;
  const maxCount = props.max ? Math.max(2, props.max) : undefined;

  // Semantic DOM
  const config = useConfig();
  const [semClass, semStyle] = useSemantic<BreadcrumbSemanticKey>(
    classNamesProp,
    stylesProp,
    config.breadcrumb,
  );

  const renderItem = (dataItem: Item): ReactNode => {
    return <BreadcrumbItem dataItem={dataItem} renderItem={props.renderItem} jssStyle={props.jssStyle} max={maxCount} semClass={semClass} semStyle={semStyle} />
  };

  const renderArray = (data: StructureArray<Item>) => {
    return <List data={data} renderItem={renderItem} jssStyle={props.jssStyle} maxHeight={maxHeight} semClass={semClass} semStyle={semStyle} />;
  };
  const className = classNames(breadcrumbClasses?.rootClass, breadcrumbClasses?.wrapper, props.className, semClass('root'));

  const getRenderData = () => {
    if (!maxCount) return data;
    if (data.length <= maxCount) return data;
    const first = data[0];
    const sliceIndex = data.length - maxCount + 1;
    const reset = data.slice(sliceIndex);
    const moreData = data.slice(1, sliceIndex);

    const moreClassName = classNames(props.className, breadcrumbClasses.wrapperPopover);
    // 嵌套 Breadcrumb 不透传 root 的 semantic，避免"盒中盒"重复装饰
    const { root: _rootCls, ...innerClassNames } = classNamesProp || {};
    const { root: _rootSty, ...innerStyles } = stylesProp || {};
    const more = {
      title: (
        <span className={classNames(breadcrumbClasses?.content, breadcrumbClasses?.ellipsis, semClass('content'))} style={semStyle('content')}>
          ...
          <Popover jssStyle={props.jssStyle} useTextStyle offset={[8, 0]} popupGap={-4}>
            <Breadcrumb {...props} className={moreClassName} data={moreData} max={undefined} classNames={innerClassNames} styles={innerStyles} />
          </Popover>
        </span>
      ),
    };
    return [first, more, ...reset];
  };

  const lastIndex = Math.min(data.length - 1, (maxCount !== undefined ? maxCount : data.length - 1));
  return (
    <div className={className} style={{ ...props.style, ...semStyle('root') }}>
      {data &&
        getRenderData().map((d, index) => {
          const itemFirst = Array.isArray(d) ? d[0] : d;
          const isLastItem = index === lastIndex;
          return (
            <div
              className={classNames(breadcrumbClasses?.item, semClass('item'))}
              style={semStyle('item')}
              key={props.keygen ? getKey(props.keygen, itemFirst as Item, index) : index}
            >
              {Array.isArray(d) ? renderArray(d) : <BreadcrumbItem dataItem={d as Item} renderItem={props.renderItem} jssStyle={props.jssStyle} max={maxCount} semClass={semClass} semStyle={semStyle} />}
              {!isLastItem && <div className={classNames(breadcrumbClasses?.separator, semClass('separator'))} style={semStyle('separator')}>{separator}</div>}
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
