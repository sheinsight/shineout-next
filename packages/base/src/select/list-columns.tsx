import React from 'react';
import { KeygenResult } from '@sheinx/hooks';
import VirtualList from '../virtual-scroll/virtual-list';
import { SelectClasses } from '@sheinx/shineout-style';
import { BaseListProps } from './select.type';

const ColumnsList = <DataItem, Value>(props: BaseListProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    height,
    optionWidth,
    header,
    keygen,
    // datum,
    // multiple,
    itemsInView = 10,
    lineHeight = 34,
    loading,
    columns = 1,
    // renderItem: renderItemProp = (d) => d as React.ReactNode,
    // closePop,
  } = props;

  const style = {
    width: optionWidth,
    height,
  };
  const styles = jssStyle?.select?.() as SelectClasses;

  const renderLoading = () => {
    return <div>loading</div>;
  };

  const renderHeader = () => {
    return <div>header</div>;
  };

  const renderItem = (item: DataItem, index: number, key: KeygenResult) => {
    return (
      <React.Fragment key={key}>
        <div>2333</div>
      </React.Fragment>
    );
  };

  // const renderColumnsItem = () => {
  //   const sliceData = data.reduce((red: DataItem[][], item) => {
  //     let lastItem: DataItem[] = red[red.length - 1];
  //     if (!lastItem) {
  //       lastItem = [];
  //       red.push(lastItem);
  //     }
  //     if (lastItem.length >= columns) red.push([item]);
  //     else lastItem.push(item);
  //     return red;
  //   }, []);
  //   return <div>2333</div>;
  // };

  const renderList = () => {
    if (loading) return renderLoading();

    return (
      <VirtualList
        jssStyle={jssStyle}
        data={data}
        keygen={keygen}
        tag={'ul'}
        tagClassName={styles.virtualList}
        height={height}
        colNum={columns}
        lineHeight={lineHeight}
        rowsInView={itemsInView}
        renderItem={renderItem}
      ></VirtualList>
    );
  };

  return (
    <div className={styles.list} style={style}>
      {header && renderHeader()}
      {renderList()}
    </div>
  );
};

export default ColumnsList;
