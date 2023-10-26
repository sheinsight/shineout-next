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
    const every = data.every((item) => {
      const has = selectedKeys.get(util.getKey(keygen, item));
      if (has) some = true;
      return has;
    });

    if (every) return true;
    if (some) return 'indeterminate';
    return false;
  };

  const handleChange = () => {
    if (simple) {
      onSelectAll(validKeys, listType);
      return;
    }
    if (selectedKeys.size === 0) {
      onSelectAll(validKeys, listType);
      return;
    }
    if (selectedKeys.size < data.length) {
      onSelectAll([], listType);
      return;
    }
    if (selectedKeys.size === data.length) {
      onSelectAll([], listType);
      return;
    }
  };

  const handleRemoveAll = () => {
    onRemoveAll();
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
      <Checkbox jssStyle={jssStyle} checked={getChecked()} onChange={handleChange}>
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
