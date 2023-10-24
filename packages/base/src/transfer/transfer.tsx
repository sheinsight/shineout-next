import classNames from 'classnames';
import { TransferProps, TransferClasses } from './transfer.type';
import { useTransfer, TransferListType } from '@sheinx/hooks';
import TransferList from './transfer-list';
import Button from '../button';
import Icon from '../icons';

const Transfer = <DataItem, Value>(props: TransferProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    value,
    keygen,
    empty,
    selectedKeys,
    listHeight = 186,
    onFilter: onFilterProp,
    onChange: onChangeProp,
    onSelectChange,
    renderItem = (item: DataItem) => item as React.ReactNode,
  } = props;

  const { source, target, onSelect, onSelectAll, onChange, onFilter } = useTransfer<
    DataItem,
    Value
  >({
    data,
    keygen,
    value,
    selectedKeys,
    onChange: onChangeProp,
    onFilter: onFilterProp,
    onSelectChange,
  });

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.transfer);

  // const handleChange = () => {};

  const renderOperations = () => {
    return (
      <div className={styles.operations}>
        <span>
          <Button
            disabled={source.selectedKeys.size === 0}
            className={styles.right}
            jssStyle={jssStyle}
            shape='square'
            onClick={() => onChange('target', source.selectedKeys)}
          >
            {Icon.AngleRight}
          </Button>
        </span>
        <span>
          <Button
            disabled={target.selectedKeys.size === 0}
            className={styles.left}
            jssStyle={jssStyle}
            shape='square'
            onClick={() => onChange('source', target.selectedKeys)}
          >
            {Icon.AngleLeft}
          </Button>
        </span>
      </div>
    );
  };

  const renderList = (listType: TransferListType) => {
    return (
      <TransferList
        jssStyle={jssStyle}
        info={listType === 'source' ? source : target}
        keygen={keygen}
        empty={empty}
        listType={listType}
        renderItem={renderItem}
        listHeight={listHeight}
        onSelect={onSelect}
        onSelectAll={onSelectAll}
        onFilter={onFilter}
        onChange={onChange}
      />
    );
  };

  return (
    <div className={rootClass}>
      {renderList('source')}
      {renderOperations()}
      {renderList('target')}
    </div>
  );
};

export default Transfer;
