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
    simple,
    titles,
    footers,
    selectedKeys,
    listHeight = 186,
    beforeChange,
    onFilter: onFilterProp,
    onChange: onChangeProp,
    // onSelectChange: onSelectChangeProp,
    renderItem = (item: DataItem) => item as React.ReactNode,
  } = props;

  const handleChange = (value, currentData, isTarget) => {
    console.log('change', value, currentData, isTarget);
    onChangeProp?.(value, currentData, isTarget);
  };
  const handleSelectChange = () => {
    // console.log('select', v);
  };

  const {
    source,
    target,
    filterSourceText,
    filterTargetText,
    onSelect,
    onSelectAll,
    onRemoveAll,
    onChange,
    onFilter,
  } = useTransfer<DataItem, Value>({
    data,
    keygen,
    value,
    simple,
    valueControl: 'value' in props,
    selectControl: 'selectedKeys' in props,
    selectedKeys,
    beforeChange,
    onChange: handleChange,
    onFilter: onFilterProp,
    onSelectChange: handleSelectChange,
  });

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.transfer, {
    [styles.simple]: simple,
  });

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
    const isSource = listType === 'source';
    const title = isSource ? titles?.[0] : titles?.[1];
    const footer = isSource ? footers?.[0] : footers?.[1];
    return (
      <TransferList
        jssStyle={jssStyle}
        info={isSource ? source : target}
        keygen={keygen}
        empty={empty}
        title={title}
        footer={footer}
        filterText={isSource ? filterSourceText : filterTargetText}
        listType={listType}
        renderItem={renderItem}
        listHeight={listHeight}
        simple={simple}
        onSelect={onSelect}
        onSelectAll={onSelectAll}
        onRemoveAll={onRemoveAll}
        onFilter={onFilterProp ? onFilter : undefined}
        onChange={onChange}
      />
    );
  };

  return (
    <div className={rootClass}>
      {renderList('source')}
      {!simple && renderOperations()}
      {renderList('target')}
    </div>
  );
};

export default Transfer;
