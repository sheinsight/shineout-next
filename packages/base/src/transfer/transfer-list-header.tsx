import classNames from 'classnames';
import { TransferClasses } from './transfer.type';
import { Checkbox } from '../checkbox';
import { TransferListHeaderProps } from './transfer-list-header.type';

const TransferListHeader = <DataItem,>(props: TransferListHeaderProps<DataItem>) => {
  const { jssStyle, info, onSelectAll } = props;
  const { data, selectedKeys, validKeys, listType } = info;

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.header);

  const getChecked = () => {
    if (selectedKeys.size === 0) return false;
    if (selectedKeys.size === data.length) return true;
    return 'indeterminate';
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
