import React from 'react';
import { util } from '@sheinx/hooks';
import { VirtualScrollList } from '../virtual-scroll';
import { SelectClasses } from './select.type';
import { BaseListProps } from './select.type';
import ListColumnsOption from './list-columns-option';
import Checkbox from '../checkbox/simple-checkbox';
import { getLocale, useConfig } from '../config';

const ColumnsList = <DataItem, Value>(props: BaseListProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
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
    columnsTitle,
    groupKey: groupKeyProp,
    renderItem: renderItemProp,
    closePop,
  } = props;

  const groupKey = groupKeyProp as keyof DataItem;
  const styles = jssStyle?.select?.() as SelectClasses;
  const { locale } = useConfig();

  // columns 模式无上下边距，故而 lineHeight 需要调整
  const getLineHeight = () => {
    if (lineHeightProp && lineHeightProp !== 'auto') return lineHeightProp;
    if (size === 'small') return 24;
    if (size === 'default') return 32;
    if (size === 'large') return 40;
    return 32;
  };
  const lineHeight = getLineHeight();

  const getHeight = () => {
    if (props.height) return props.height;
    return lineHeight * 7;
  };

  const height = getHeight();

  const getChecked = () => {
    if (!value) return false;

    if (util.isArray(value) && value.length === 0) {
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

  const renderGroupTitle = (item: DataItem, key: string) => {
    if (item[groupKey]) {
      const title = item[groupKey];
      return (
        <div className={styles.optionGroupTitle} key={key} title={typeof title === 'string' ? title as string : undefined} style={{ height: 'var(--group-title-height)' }}>
          {title as React.ReactNode}
        </div>
      );
    }
    return null;
  };

  const renderItem = (data: DataItem[], currentIndex: number) => {
    return (
      <div className={styles?.columns} key={currentIndex} style={{ height: lineHeight }}>
        {data.map((item, index) => {
          const isGroupTitleRow =
            (groupKey && Object.keys(item as object).length === 0) || item[groupKey];
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
              columns={columns}
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
      <VirtualScrollList
        data={sliceData as DataItem[]}
        tag={'ul'}
        keygen={keygen}
        groupKey={groupKey as string}
        tagClassName={styles.virtualList}
        height={height as number}
        colNum={columns}
        lineHeight={lineHeight}
        rowsInView={itemsInView}
        renderItem={renderItem}
        paddingY={4}
      ></VirtualScrollList>
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
          {getLocale(locale, 'selectAll')}
        </Checkbox>
        {columnsTitle && <div className={styles.columnsTitle}>{columnsTitle}</div>}
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
