import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { TransferListItemProps } from './transfer-list-item.type';
import { TransferClasses } from './transfer.type';
import { util, KeygenResult } from '@sheinx/hooks';

import Checkbox from '../checkbox';

const TransferListItem = <DataItem,>(props: TransferListItemProps<DataItem>) => {
  const {
    jssStyle,
    keygen,
    data,
    lineHeight,
    renderItem: renderItemProp,
    checked,
    onChange,
  } = props;
  const listItem = useRef<HTMLDivElement>(null);
  const listItemHeight = useRef(lineHeight);

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.item);

  const renderItem = () => {
    if (util.isString(renderItemProp)) {
      return data[renderItemProp] as React.ReactNode;
    }

    return renderItemProp(data);
  };

  const handleChange = (value: any, checked: boolean) => {
    const key = util.getKey(keygen, data) as KeygenResult;
    onChange(key, checked);
  };

  useEffect(() => {
    if (!listItem.current) return;
    const realHeight = listItem.current.getBoundingClientRect().height;
    if (listItemHeight.current === realHeight) return;

    listItemHeight.current = realHeight;

    console.log(listItemHeight.current);
  }, []);

  return (
    <div ref={listItem} className={rootClass}>
      <Checkbox jssStyle={jssStyle} checked={checked} onChange={handleChange}>
        {renderItem()}
      </Checkbox>
    </div>
  );
};

export default TransferListItem;
