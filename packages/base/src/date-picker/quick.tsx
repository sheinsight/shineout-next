import React, { useRef } from 'react';
import type { QuickProps } from './quick.type';
import type { QuickSelectType, DatePickerValueType } from './date-picker.type';
import { dateUtil, util } from '@sheinx/hooks';
import clsx from 'clsx';

const Quick = (props: QuickProps) => {
  const { jssStyle, quickSelect, format, onClearInputArr, options, children, type, closePop } =
    props;
  const styles = jssStyle?.datePicker?.();
  const quickDateCache = useRef<DatePickerValueType>();
  const quickActiveKey = useRef<number>();

  const handleClick = (item: QuickSelectType, index: number) => {
    const { immediate } = item;
    let itemV = util.isFunc(item.value) ? item.value() : item.value;
    quickDateCache.current = itemV;
    quickActiveKey.current = index;
    if (!util.isArray(itemV)) {
      itemV = [itemV];
    }
    const dateArr = itemV.map((v) => {
      if (typeof v === 'string') {
        return dateUtil.parse(v, format, options);
      }
      return dateUtil.toDate(v, options);
    });
    props.setDateArr(dateArr);
    props.setCurrentArr(dateArr, 'quick', item);
    onClearInputArr()
    if (immediate && closePop) {
      closePop();
    }
  };

  if (!quickSelect?.length) {
    return (children || null) as React.ReactElement;
  }

  const compareDate = (index: number) => {
    if (!quickDateCache.current) return false;
    if (index !== quickActiveKey.current) return false;
    let currentArr = quickDateCache.current;
    if (!util.isArray(currentArr)) {
      currentArr = [currentArr];
    }
    return dateUtil.compareDateArray(
      currentArr as Date[],
      props.dateArr as Date[],
      type,
      options,
      format,
    );
  };

  return (
    <div className={clsx(styles?.quickPicker, styles?.picker)}>
      {quickSelect?.map((item, index) => {
        const isActive = compareDate(index);
        return (
          <div
            key={index}
            className={clsx(
              styles?.quickPickerItem,
              isActive && styles?.quickPickerActiveItem,
            )}
            onClick={() => {
              handleClick(item, index);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default Quick;
