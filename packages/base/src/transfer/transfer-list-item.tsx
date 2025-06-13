import { useContext, useRef } from 'react';
import classNames from 'classnames';
import { TransferListItemProps } from './transfer-list-item.type';
import { TransferClasses } from './transfer.type';
import { util, TransferContext } from '@sheinx/hooks';
import Icons from '../icons';
import Checkbox from '../checkbox';

const TransferListItem = <DataItem,>(props: TransferListItemProps<DataItem>) => {
  const {
    jssStyle,
    size,
    data,
    datum,
    listDatum,
    lineHeight,
    renderItem: renderItemProp,
    simple,
    itemClass,
    listType,
  } = props;
  const listItem = useRef<HTMLDivElement>(null);
  // const listItemHeight = useRef(lineHeight);

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const commonStyles = jssStyle?.common?.() || {};
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

  const { filterSourceText, filterTargetText, highlight } = useContext(TransferContext);
  const $item = util.getHighlightText({
    enable: highlight,
    nodeList: renderItem(),
    searchWords: listType === 'target' ? filterTargetText : filterSourceText,
    highlightClassName: commonStyles.highlight,
  });

  const renderCheckbox = () => {
    if (simple && listType === 'target')
      return (
        <span className={classNames(styles.simpleTarget, disabled && styles.disabled)}>
          {$item}
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
        {$item}
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
    <div ref={listItem} className={rootClass} style={{ height: lineHeight }}>
      <div className={styles.itemWrapper}>{renderCheckbox()}</div>
    </div>
  );
};

export default TransferListItem;
