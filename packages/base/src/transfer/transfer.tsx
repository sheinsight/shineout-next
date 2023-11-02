import { useMemo } from 'react';
import classNames from 'classnames';
import { TransferProps, TransferClasses } from './transfer.type';
import { useTransfer, TransferListType, KeygenResult, util } from '@sheinx/hooks';
import TransferList from './transfer-list';
import TransferOperate from './transfer-operate';
import Icon from '../icons';

const Transfer = <DataItem, Value extends KeygenResult[]>(
  props: TransferProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    data,
    value,
    keygen,
    empty,
    size,
    simple,
    titles,
    footers,
    disabled,
    itemClass,
    operations,
    lineHeight,
    loading,
    rowsInView,
    listStyle,
    listClassName,
    format,
    prediction,
    selectedKeys,
    listHeight = 186,
    operationIcon = true,
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
    onFilter,
  } = useTransfer({
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
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
  });

  const renderOperations = () => {
    const sourceOperation = operations?.[0];
    const targetOperation = operations?.[1];

    return (
      <div className={styles.operations}>
        <TransferOperate
          size={size}
          listType='source'
          jssStyle={jssStyle}
          className={styles.right}
          datum={datum}
          operation={sourceOperation}
          listDatum={sourceDatum}
          value={sourceSelectedKeys}
        >
          {operationIcon && Icon.AngleRight}
        </TransferOperate>
        <TransferOperate
          size={size}
          listType='target'
          jssStyle={jssStyle}
          className={styles.left}
          datum={datum}
          operation={targetOperation}
          listDatum={targetDatum}
          value={targetSelectedKeys}
        >
          {operationIcon && Icon.AngleLeft}
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
    const loadingValue = !!(util.isArray(loading) ? (isSource ? loading[0] : loading[1]) : loading);

    if (filterText && onFilterProp) {
      listData = listData.filter((item) => onFilterProp(filterText, item, isSource));
    }
    return (
      <TransferList
        jssStyle={jssStyle}
        size={size}
        datum={datum}
        listDatum={listDatum}
        data={listData}
        keygen={keygen}
        empty={empty}
        title={title}
        footer={footer}
        filterText={filterText}
        listType={listType}
        loading={loadingValue}
        rowsInView={rowsInView}
        renderItem={renderItem}
        listStyle={listStyle}
        listClassName={listClassName}
        listHeight={listHeight}
        lineHeight={lineHeight}
        simple={simple}
        value={listValue}
        itemClass={itemClass}
        onFilter={onFilterProp ? onFilter : undefined}
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
