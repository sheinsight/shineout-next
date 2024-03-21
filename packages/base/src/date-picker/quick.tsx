import React from 'react';
import type { QuickProps } from './quick.type';
import type { QuickSelectType } from './date-picker.type';
import { dateUtil, util } from '@sheinx/hooks';
import classNames from 'classnames';

const Quick = (props: QuickProps) => {
  const { jssStyle, quickSelect, format, options, children } = props;
  const styles = jssStyle?.datePicker?.();

  const handleClick = (item: QuickSelectType) => {
    let itemV = util.isFunc(item.value) ? item.value() : item.value;
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
  };
  if (!quickSelect?.length) {
    return (children || null) as React.ReactElement;
  }
  return (
    <div className={classNames(styles?.quickPicker, styles?.picker)}>
      {quickSelect?.map((item, index) => {
        return (
          <div
            key={index}
            className={styles?.quickPickerItem}
            onClick={() => {
              handleClick(item);
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
