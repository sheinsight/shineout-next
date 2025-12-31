import { useContext, useMemo } from 'react';
import clsx from 'clsx';
import { TransferProps } from './transfer.type';
import { TransferClasses } from './transfer.type';
import { TransferContext, useTransfer, TransferListType, KeygenResult, util, getDataset } from '@sheinx/hooks';
import TransferList from './transfer-list';
import TransferOperate from './transfer-operate';
import Icon from '../icons';
import { useConfig } from '../config';
import { FormFieldContext } from '../form/form-field-context';

const Transfer = <DataItem, Value extends KeygenResult[]>(
  props: TransferProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    className,
    style,
    data,
    value,
    defaultValue,
    defaultSelectedKeys,
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
    children,
    prediction,
    selectedKeys,
    listHeight = 186,
    operationIcon = true,
    searchPlaceholder,
    equalPanelWidth,
    beforeChange,
    renderFilter,
    onSearch,
    renderItem = (item: DataItem) => item as React.ReactNode,
    onFilter: onFilterProp,
    onChange: onChangeProp,
    onSelectChange: onSelectChangeProp,
  } = props;

  const config = useConfig();
  const isRtl = config.direction === 'rtl';

  const {
    source,
    target,
    datum,
    sourceDatum,
    targetDatum,
    filterSourceText,
    filterTargetText,
    sourceSelectedKeys,
    targetSelectedKeys,
    onFilter,
    onSelectChange,
  } = useTransfer({
    data,
    keygen,
    value,
    defaultValue,
    defaultSelectedKeys,
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
    onSearch,
    onSelectChange: onSelectChangeProp,
  });

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = clsx(styles.rootClass, styles.transfer, className, {
    [styles.simple]: simple,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.equalPanelWidth]: equalPanelWidth,
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
          {operationIcon && !sourceOperation && (isRtl ? Icon.transfer.Remove : Icon.transfer.Add)}
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
          {operationIcon && !targetOperation && (isRtl ? Icon.transfer.Add : Icon.transfer.Remove)}
        </TransferOperate>
      </div>
    );
  };

  const renderList = (listType: TransferListType) => {
    const isSource = listType === 'source';
    const listDatum = isSource ? sourceDatum : targetDatum;
    let listData = isSource ? source : target;
    const listValue = (isSource ? sourceSelectedKeys : targetSelectedKeys) as Value;
    const title = isSource ? titles?.[0] : titles?.[1];
    const footer = isSource ? footers?.[0] : footers?.[1];
    const filterText = isSource ? filterSourceText : filterTargetText;
    const loadingValue = !!(util.isArray(loading) ? (isSource ? loading[0] : loading[1]) : loading);
    const placeholder = util.isArray(searchPlaceholder)
      ? isSource
        ? searchPlaceholder[0]
        : searchPlaceholder[1]
      : searchPlaceholder;
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
        disabled={disabled}
        value={listValue}
        selectedKeys={listValue}
        itemClass={itemClass}
        customRender={children}
        searchPlaceholder={placeholder}
        renderFilter={renderFilter}
        onFilter={onFilterProp ? onFilter : undefined}
        onSelectChange={(keys) => {
          if (isSource) {
            const newAllKeys = Array.from(new Set([...keys, ...(targetSelectedKeys || [])]));
            onSelectChange(newAllKeys, keys, targetSelectedKeys);
          } else {
            const newAllKeys = Array.from(new Set([...keys, ...(sourceSelectedKeys || [])]));
            onSelectChange(newAllKeys, sourceSelectedKeys, keys);
          }
        }}
      />
    );
  };

  const renderSourceList = useMemo(() => {
    return renderList('source');
  }, [source, loading, size, filterSourceText, sourceSelectedKeys, renderFilter, children]);

  const renderTargetList = useMemo(() => {
    return renderList('target');
  }, [target, loading, size, filterTargetText, targetSelectedKeys, renderFilter, children]);

  const { fieldId } = useContext(FormFieldContext);

  return (
    <TransferContext.Provider value={{ filterSourceText, filterTargetText, highlight: props.highlight }}>
      <div className={rootClass} style={style} id={fieldId} {...getDataset(props)}>
        {renderSourceList}
        {!simple && renderOperations()}
        {renderTargetList}
      </div>
    </TransferContext.Provider>
  );
};

export default Transfer;
