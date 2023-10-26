import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { Checkbox } from '../checkbox';
import { TransferListHeaderProps } from './transfer-list-header.type';
import Icons from '../icons';

const TransferListHeader = <DataItem,>(props: TransferListHeaderProps<DataItem>) => {
  const { jssStyle, keygen, listType, simple, info, title, onSelectAll, onRemoveAll } = props;
  const { data, selectedKeys, validKeys } = info;

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.header);

  const getChecked = () => {
    if (selectedKeys.size === 0) return false;
    let some = false;
    let every = true;
    data.forEach((item) => {
      const has = selectedKeys.get(util.getKey(keygen, item));
      if (has) some = true;
      if (!has) every = false;
    });

    if (every) return true;
    if (some) return 'indeterminate';
    return false;
  };

  const checked = getChecked();

  const handleChange = () => {
    if (simple) {
      onSelectAll(validKeys, listType);
      return;
    }

    if (checked === 'indeterminate') {
      const currentKeys = Array.from(selectedKeys.keys());
      const newKeys = currentKeys.concat(validKeys);
      onSelectAll(newKeys, listType);
      return;
    }

    if (checked === true) {
      onSelectAll([], listType);
      return;
    }

    if (checked === false) {
      onSelectAll(validKeys, listType);
      return;
    }
  };

  const handleRemoveAll = () => {
    onRemoveAll(listType);
  };

  const renderCount = () => {
    return (
      <span>
        {selectedKeys.size}/{data.length}
      </span>
    );
  };

  const renderTitle = () => {
    if (simple && listType === 'target') {
      return (
        <span className={styles.title}>
          <span>{title}</span>
          <span className={styles.removeAll} onClick={handleRemoveAll}>
            {Icons.Delete}
          </span>
        </span>
      );
    }

    return title;
  };

  const renderCheckbox = () => {
    if (simple && listType === 'target') return renderCount();

    return (
      <Checkbox jssStyle={jssStyle} checked={checked} onChange={handleChange}>
        {renderCount()}
      </Checkbox>
    );
  };

  return (
    <div className={rootClass}>
      {renderCheckbox()}
      {renderTitle()}
    </div>
  );
};

export default TransferListHeader;
