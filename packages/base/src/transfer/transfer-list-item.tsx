import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { TransferListItemProps } from './transfer-list-item.type';
import { TransferClasses } from './transfer.type';
import { util, KeygenResult } from '@sheinx/hooks';
import Icons from '../icons';
import Checkbox from '../checkbox';

const TransferListItem = <DataItem,>(props: TransferListItemProps<DataItem>) => {
  const {
    jssStyle,
    keygen,
    data,
    lineHeight,
    renderItem: renderItemProp,
    checked,
    simple,
    listType,
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

  const handleRemove = () => {
    const key = util.getKey(keygen, data) as KeygenResult;
    onChange(key, false);
  };

  const renderRemove = () => {
    return (
      <span className={styles.close} onClick={handleRemove}>
        {Icons.Close}
      </span>
    );
  };

  const renderCheckbox = () => {
    if (simple && listType === 'target')
      return (
        <span className={styles.simpleTarget}>
          {renderItem()}
          {renderRemove()}
        </span>
      );
    return (
      <Checkbox jssStyle={jssStyle} checked={checked} onChange={handleChange}>
        {renderItem()}
      </Checkbox>
    );
  };

  useEffect(() => {
    if (!listItem.current) return;
    const realHeight = listItem.current.getBoundingClientRect().height;
    if (listItemHeight.current === realHeight) return;

    listItemHeight.current = realHeight;
  }, []);

  return (
    <div ref={listItem} className={rootClass}>
      {renderCheckbox()}
    </div>
  );
};

export default TransferListItem;
