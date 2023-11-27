import React from 'react';
import { util } from '@sheinx/hooks';
import VirtualList from '../virtual-scroll/virtual-list';
import { SelectClasses } from '@sheinx/shineout-style';
import { BaseListProps } from './select.type';
import ListColumnsOption from './list-columns-option';
import Checkbox from '../checkbox/simple-checkbox';

const ColumnsList = <DataItem extends [], Value>(props: BaseListProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    height,
    header,
    keygen,
    datum,
    multiple,
    itemsInView = 10,
    lineHeight = 34,
    loading,
    value,
    columns = 1,
    columnWidth,
    renderItem: renderItemProp,
    // closePop,
  } = props;

  const styles = jssStyle?.select?.() as SelectClasses;

  const getChecked = () => {
    if (!value) return false;

    if (value.length === 0) {
      return false;
    }

    let every = true;
    let some = false;

    if (data.length === 0) return false;

    data.forEach((item: DataItem) => {
      if (!datum.check(item)) {
        every = false;
      } else {
        some = true;
      }
    });
    if (every) return true;
    if (some) return 'indeterminate';
    return false;
  };

  const checked = getChecked();

  const handleChange = (isChecked: boolean) => {
    // const isChecked = data.length === (value || []).length;
    if (!isChecked) {
      const next = data.filter((item) => datum.check(item) && !datum.disabledCheck(item));
      datum.remove(next);
      return;
    }
    const next = data.filter((item) => !datum.check(item) && !datum.disabledCheck(item));
    datum.add(next);
  };

  const renderLoading = () => {
    return <div>loading</div>;
  };

  const renderHeader = () => {
    return <div>header</div>;
  };

  const renderItem = (data: DataItem[], currentIndex: number) => {
    return (
      <div className={styles?.columns} key={currentIndex} style={{ height: lineHeight }}>
        {data.map((item, index) => {
          const key = util.getKey(keygen, item, currentIndex + index);
          return (
            <ListColumnsOption<DataItem, Value>
              jssStyle={jssStyle}
              key={key}
              data={item}
              datum={datum}
              multiple={multiple}
              columnWidth={columnWidth}
              renderItem={renderItemProp}
            ></ListColumnsOption>
          );
        })}
      </div>
    );
  };

  const renderList = () => {
    if (loading) return renderLoading();

    const sliceData = data.reduce((red: DataItem[][], item) => {
      let lastItem: DataItem[] = red[red.length - 1];
      if (!lastItem) {
        lastItem = [];
        red.push(lastItem);
      }
      if (lastItem.length >= columns) red.push([item]);
      else lastItem.push(item);
      return red;
    }, []);

    return (
      <VirtualList
        jssStyle={jssStyle}
        data={sliceData}
        tag={'ul'}
        tagClassName={styles.virtualList}
        height={height as number}
        colNum={columns}
        lineHeight={lineHeight}
        rowsInView={itemsInView}
        renderItem={renderItem}
      ></VirtualList>
    );
  };

  const renderSelectAll = () => {
    if (!multiple) return;

    return (
      <div className={styles.header}>
        <Checkbox jssStyle={jssStyle} checked={checked} onChange={handleChange}>
          全选
        </Checkbox>
      </div>
    );
  };

  return (
    <div className={styles.list}>
      {header && renderHeader()}
      {multiple && renderSelectAll()}
      {renderList()}
    </div>
  );
};

export default ColumnsList;
