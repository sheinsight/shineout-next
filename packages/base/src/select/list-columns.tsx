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
    lineHeight: lineHeightProp,
    loading,
    value,
    size,
    columns = 1,
    columnWidth,
    groupKey,
    renderItem: renderItemProp,
    closePop,
  } = props;

  const styles = jssStyle?.select?.() as SelectClasses;

  // columns 模式无上下边距，故而 lineHeight 需要调整
  const getLineHeight = () => {
    if (lineHeightProp) return lineHeightProp;
    if (size === 'small') return 24;
    if (size === 'default') return 32;
    if (size === 'large') return 40;
    return 32;
  };

  const lineHeight = getLineHeight();

  const getChecked = () => {
    if (!value) return false;

    if (value.length === 0) {
      return false;
    }

    let every = true;
    let some = false;

    if (data.length === 0) return false;

    data.forEach((item: DataItem) => {
      if (groupKey && item[groupKey]) return;
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
    if (!isChecked) {
      const next = data.filter(
        (item) => !item[groupKey] && datum.check(item) && !datum.disabledCheck(item),
      );
      datum.remove(next);
      return;
    }
    const next = data.filter(
      (item) => !item[groupKey] && !datum.check(item) && !datum.disabledCheck(item),
    );
    datum.add(next);
  };

  const renderLoading = () => {
    return <div>loading</div>;
  };

  const renderHeader = () => {
    return <div>header</div>;
  };

  const renderGroupTitle = (item, key) => {
    if (item[groupKey]) {
      return (
        <div className={styles.optionGroupTitle} key={key}>
          {item[groupKey]}
        </div>
      );
    }
    return null;
  };

  const renderItem = (data: DataItem[], currentIndex: number) => {
    return (
      <div className={styles?.columns} key={currentIndex} style={{ height: lineHeight }}>
        {data.map((item, index) => {
          const isGroupTitleRow = (groupKey && Object.keys(item).length === 0) || item[groupKey];
          if (isGroupTitleRow) {
            return renderGroupTitle(item, `__${currentIndex}__${index}__${item[groupKey]}__`);
          }

          const key = util.getKey(keygen, item, currentIndex + index);

          return (
            <ListColumnsOption<DataItem, Value>
              jssStyle={jssStyle}
              key={key}
              data={item}
              size={size}
              datum={datum}
              multiple={multiple}
              columnWidth={columnWidth}
              renderItem={renderItemProp}
              closePop={closePop}
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

      // 如果item有groupKey属性，创建一个新的数组，只包含这个item，剩余位置用空对象填充
      if (item[groupKey]) {
        const newItemArray = new Array(columns).fill({});
        newItemArray[0] = item;
        red.push(newItemArray);
        return red;
      }

      if (!lastItem) {
        lastItem = [];
        red.push(lastItem);
      }
      if (lastItem.length >= columns) red.push([item]);
      else {
        lastItem.push(item);
      }
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
        <Checkbox
          className={styles.columnsCheckbox}
          size={size}
          jssStyle={jssStyle}
          checked={checked}
          onChange={handleChange}
        >
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
