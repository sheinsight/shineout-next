import { useRef } from 'react';
import classNames from 'classnames';
import { TransferListItemProps } from './transfer-list-item.type';
import { TransferClasses } from './transfer.type';
import { util } from '@sheinx/hooks';
import Icons from '../icons';
import Checkbox from '../checkbox';

const TransferListItem = <DataItem,>(props: TransferListItemProps<DataItem>) => {
  const {
    jssStyle,
    size,
    data,
    datum,
    listDatum,
    // lineHeight,
    renderItem: renderItemProp,
    simple,
    itemClass,
    listType,
  } = props;
  const listItem = useRef<HTMLDivElement>(null);
  // const listItemHeight = useRef(lineHeight);

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const isChecked = listDatum.check(data);
  const disabled = listDatum.disabledCheck(data);
  const rootClass = classNames(styles.item, itemClass, disabled && styles.disabled);

  const renderItem = () => {
    if (util.isString(renderItemProp)) {
      return data[renderItemProp] as React.ReactNode;
    }

    return renderItemProp(data);
  };

  const handleChange = (_: any, isChecked: boolean) => {
    const add = simple ? datum.add : listDatum.add;
    const remove = simple ? datum.remove : listDatum.remove;
    if (isChecked) {
      add(data);
    } else {
      remove(data);
    }
  };

  const handleRemove = () => {
    if (disabled) return;
    datum.remove(data);
  };

  const renderRemove = () => {
    return (
      <span className={styles.close} onClick={handleRemove}>
        {Icons.transfer.DeleteItem}
      </span>
    );
  };

  const renderCheckbox = () => {
    if (simple && listType === 'target')
      return (
        <span className={classNames(styles.simpleTarget, disabled && styles.disabled)}>
          {renderItem()}
          {renderRemove()}
        </span>
      );
    return (
      <Checkbox
        // @ts-ignore
        theme='dark'
        size={size}
        jssStyle={jssStyle}
        className={styles.checkbox}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
      >
        {renderItem()}
      </Checkbox>
    );
  };

  // useEffect(() => {
  //   if (!listItem.current) return;
  //   const realHeight = listItem.current.getBoundingClientRect().height;
  //   if (listItemHeight.current === realHeight) return;

  //   listItemHeight.current = realHeight;
  // }, []);

  return (
    <div ref={listItem} className={rootClass}>
      <div className={styles.itemWrapper}>{renderCheckbox()}</div>
    </div>
  );
};

export default TransferListItem;
