import { useMemo } from 'react';
import classNames from 'classnames';
import { TransferProps, TransferClasses } from './transfer.type';
import { useTransfer, TransferListType, KeygenResult } from '@sheinx/hooks';
import TransferList from './transfer-list';
import TransferOperate from './transfer-operate';
import Icon from '../icons';

const Transfer = <DataItem, Value extends KeygenResult>(props: TransferProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    value,
    keygen,
    empty,
    simple,
    titles,
    footers,
    disabled,
    format = (item: DataItem) => item,
    prediction,
    selectedKeys,
    listHeight = 186,
    beforeChange,
    onFilter: onFilterProp,
    onChange: onChangeProp,
    onSelectChange,
    renderItem = (item: DataItem) => item as React.ReactNode,
  } = props;

  const {
    datum,
    sourceDatum,
    targetDatum,
    source,
    target,
    filterSourceText,
    filterTargetText,
    sourceSelectedKeys,
    targetSelectedKeys,
    onSelectAll,
    onRemoveAll,
    onChange,
    onFilter,
  } = useTransfer<DataItem, Value>({
    data,
    keygen,
    value,
    simple,
    disabled,
    format,
    prediction,
    valueControl: 'value' in props,
    selectControl: 'selectedKeys' in props,
    selectedKeys,
    beforeChange,
    onChange: onChangeProp,
    onFilter: onFilterProp,
    onSelectChange,
  });

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.transfer, {
    [styles.simple]: simple,
  });

  // const getData = (filterText: string, data: DataItem[], listType: TransferListType) => {
  //   if (!onFilter || !filterText) {
  //     return data;
  //   }
  //   const isSource = listType === 'source';
  //   const filterData = data.filter((item: DataItem) => onFilter(filterText, item, isSource));

  //   return filterData;
  // };

  const renderOperations = () => {
    return (
      <div className={styles.operations}>
        <TransferOperate
          listType='source'
          jssStyle={jssStyle}
          className={styles.right}
          datum={datum}
          listDatum={sourceDatum}
          value={sourceSelectedKeys}
          onChange={onChange}
        >
          {Icon.AngleRight}
        </TransferOperate>
        <TransferOperate
          listType='target'
          jssStyle={jssStyle}
          className={styles.left}
          datum={datum}
          listDatum={targetDatum}
          value={targetSelectedKeys}
          onChange={onChange}
        >
          {Icon.AngleLeft}
        </TransferOperate>
      </div>
    );
  };

  const renderList = (listType: TransferListType) => {
    const isSource = listType === 'source';
    const listDatum = isSource ? sourceDatum : targetDatum;
    let listData = isSource ? source : target;
    const listValue = isSource ? sourceSelectedKeys : targetSelectedKeys;
    const title = isSource ? titles?.[0] : titles?.[1];
    const footer = isSource ? footers?.[0] : footers?.[1];
    const filterText = isSource ? filterSourceText : filterTargetText;
    if (filterText && onFilterProp) {
      listData = listData.filter((item) => onFilterProp(filterText, item, isSource));
    }
    return (
      <TransferList
        jssStyle={jssStyle}
        datum={datum}
        listDatum={listDatum}
        data={listData}
        keygen={keygen}
        empty={empty}
        title={title}
        footer={footer}
        filterText={filterText}
        listType={listType}
        renderItem={renderItem}
        listHeight={listHeight}
        simple={simple}
        value={listValue}
        // onSelect={onSelectChange}
        onSelectAll={onSelectAll}
        onRemoveAll={onRemoveAll}
        onFilter={onFilterProp ? onFilter : undefined}
        onChange={onChange}
      />
    );
  };

  const renderSourceList = useMemo(() => {
    return renderList('source');
  }, [source, filterSourceText, sourceSelectedKeys]);

  const renderTargetList = useMemo(() => {
    return renderList('target');
  }, [target, filterTargetText, targetSelectedKeys]);

  return (
    <div className={rootClass}>
      {renderSourceList}
      {!simple && renderOperations()}
      {renderTargetList}
    </div>
  );
};

export default Transfer;
