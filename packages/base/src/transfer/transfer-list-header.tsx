import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { Checkbox } from '../checkbox';
import { TransferListHeaderProps } from './transfer-list-header.type';

const TransferListHeader = <DataItem,>(props: TransferListHeaderProps<DataItem>) => {
  const { jssStyle, keygen, info, onSelectAll } = props;
  const { data, selectedKeys, validKeys, listType } = info;

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

  return (
    <div className={rootClass}>
      <Checkbox jssStyle={jssStyle} checked={getChecked()} onChange={handleChange}>
        {selectedKeys.size}/{data.length}
      </Checkbox>
    </div>
  );
};

export default TransferListHeader;
