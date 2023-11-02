import classNames from 'classnames';
import { KeygenResult } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { Checkbox } from '../checkbox';
import { TransferListHeaderProps } from './transfer-list-header.type';
import Icons from '../icons';

const TransferListHeader = <DataItem, Value extends KeygenResult[]>(
  props: TransferListHeaderProps<DataItem, Value>,
) => {
  const { jssStyle, size, value, data, listType, simple, reset, datum, listDatum, title } = props;

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.header);

  const getChecked = () => {
    if (value.length === 0) {
      return false;
    }

    let every = true;
    let some = false;
    const vaildData = listDatum.getVaildData();

    if (vaildData.length === 0) return false;

    vaildData.forEach((item: DataItem) => {
      if (!listDatum.check(item)) {
        every = false;
      } else {
        some = true;
      }
    });
    if (every) return true;
    if (some) return 'indeterminate';
    return false;
  };

  const checked = getChecked();

  const handleChange = () => {
    if (simple) {
      datum.add(listDatum.getVaildData());
      reset?.();
      return;
    }
    if (data.length === 0) return;
    if (checked === true) {
      listDatum.remove(data);
      return;
    }

    if (checked === false) {
      listDatum.add(data);
      return;
    }

    if (checked === 'indeterminate') {
      const unCheckedItems = data.filter((item: DataItem) => {
        return listDatum.check(item) === false;
      });
      listDatum.add(unCheckedItems);
      return;
    }
  };

  const handleRemoveAll = () => {
    datum.remove(listDatum.getVaildData());
    reset?.();
  };

  const renderCount = () => {
    return (
      <span className={styles.count}>
        {value.length}/{data.length}
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

    return <span className={styles.title}>{title}</span>;
  };

  const renderCheckbox = () => {
    if (simple && listType === 'target') return renderCount();

    return (
      <Checkbox
        jssStyle={jssStyle}
        size={size}
        theme='dark'
        checked={checked}
        onChange={handleChange}
      >
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
