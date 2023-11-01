import classNames from 'classnames';
import { TransferClasses } from './transfer.type';
import { Checkbox } from '../checkbox';
import { TransferListHeaderProps } from './transfer-list-header.type';
import Icons from '../icons';

const TransferListHeader = <DataItem,>(props: TransferListHeaderProps<DataItem>) => {
  const { jssStyle, value, data, listType, simple, datum, listDatum, title } = props;

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
    datum.remove(datum.getVaildData());
  };

  const renderCount = () => {
    return (
      <span>
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

    return title;
  };

  const renderCheckbox = () => {
    if (simple && listType === 'target') return renderCount();

    return (
      <Checkbox jssStyle={jssStyle} theme='dark' checked={checked} onChange={handleChange}>
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
