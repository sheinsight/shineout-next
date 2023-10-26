import classNames from 'classnames';
import { TransferProps, TransferClasses } from './transfer.type';
import { useTransfer, TransferListType, KeygenResult } from '@sheinx/hooks';
import TransferList from './transfer-list';
import TransferOperate from './transfer-operate';
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
    onSelectChange: onSelectChangeProp,
    renderItem = (item: DataItem) => item as React.ReactNode,
  } = props;

  // 2.x 抛出参数包含 source target，此外新增一个二者合并的总 select 项
  const handleSelectChange = (
    select: KeygenResult[],
    source: KeygenResult[],
    target: KeygenResult[],
  ) => {
    onSelectChangeProp?.(source, target, select);
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
    onChange: onChangeProp,
    onFilter: onFilterProp,
    onSelectChange: handleSelectChange,
  });

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.transfer, {
    [styles.simple]: simple,
  });

  const renderOperations = () => {
    const sourceSelectKeys = Array.from(source.selectedKeys.keys());
    const targetSelectKeys = Array.from(target.selectedKeys.keys());

    return (
      <div className={styles.operations}>
        <TransferOperate
          listType='target'
          jssStyle={jssStyle}
          className={styles.right}
          selectedKeys={sourceSelectKeys}
          onChange={onChange}
        >
          {Icon.AngleRight}
        </TransferOperate>
        <TransferOperate
          listType='source'
          jssStyle={jssStyle}
          className={styles.left}
          selectedKeys={targetSelectKeys}
          onChange={onChange}
        >
          {Icon.AngleLeft}
        </TransferOperate>
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
