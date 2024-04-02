import classNames from 'classnames';
import { util, KeygenResult } from '@sheinx/hooks';
import { getLocale, useConfig } from '../config';
import { TransferClasses } from './transfer.type';
import { TransferListProps } from './transfer-list.type';
import TransferListItem from './transfer-list-item';
import TransferListHeader from './transfer-list-header';
import Empty from '../empty';
import Input from '../input';
import Spin from '../spin';
import Icons from '../icons';
import VirtualList from '../virtual-scroll/virtual-scroll-list';

const TransferList = <DataItem, Value extends KeygenResult[]>(
  props: TransferListProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    datum,
    listDatum,
    data,
    size,
    value,
    renderItem: renderItemProp,
    keygen,
    loading,
    listStyle,
    listClassName,
    listHeight = 180,
    lineHeight: lineHeightProp,
    listType,
    rowsInView = 20,
    colNum = 1,
    empty,
    title,
    footer,
    itemClass,
    filterText,
    simple,
    disabled,
    selectedKeys,
    renderFilter: renderFilterProp,
    searchPlaceholder,
    customRender,
    onFilter,
    onSelectChange,
  } = props;
  const { locale } = useConfig();

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.view, {
    [styles.source]: listType === 'source',
    [styles.target]: listType === 'target',
  });
  const listClass = classNames(styles.list, listClassName);

  const getLineHeight = () => {
    if (lineHeightProp) {
      return lineHeightProp;
    }
    if (size === 'small') {
      return 32;
    }
    if (size === 'large') {
      return 36;
    }
    return 34;
  };

  const lineHeight = getLineHeight();

  const handleFilter = (v?: string) => {
    onFilter?.(v as string, listType);
  };

  const renderHeader = () => {
    return (
      <TransferListHeader
        jssStyle={jssStyle}
        keygen={keygen}
        title={title}
        datum={datum}
        size={size}
        data={data}
        loading={loading}
        value={value}
        listDatum={listDatum}
        listType={listType}
        simple={simple}
      ></TransferListHeader>
    );
  };

  const renderFilter = () => {
    if (renderFilterProp) {
      return (
        <div className={styles.input}>
          {renderFilterProp({
            text: filterText,
            disabled: disabled === true,
            onFilter: handleFilter,
            placeholder: getLocale(locale, 'search'),
            isSrouce: listType === 'source',
          })}
        </div>
      );
    }
    return (
      <div className={styles.inputWrapper}>
        <Input
          className={styles.input}
          clearable
          jssStyle={jssStyle}
          value={filterText}
          suffix={Icons.transfer.Search}
          onChange={handleFilter}
          placeholder={searchPlaceholder || getLocale(locale, 'search')}
        ></Input>
      </div>
    );
  };

  const renderEmpty = () => {
    if (!empty) {
      return (
        <div className={styles.empty}>
          <Empty jssStyle={jssStyle}></Empty>
        </div>
      );
    }
    return <div className={styles.empty}>{empty}</div>;
  };

  const renderItem = (item: DataItem, index: number, key: KeygenResult) => {
    return (
      <TransferListItem
        key={key}
        jssStyle={jssStyle}
        size={size}
        data={item}
        datum={datum}
        listDatum={listDatum}
        simple={simple}
        itemClass={itemClass}
        listType={listType}
        keygen={keygen}
        lineHeight={lineHeight}
        renderItem={renderItemProp}
        disabled={datum.disabledCheck(item)}
      />
    );
  };

  const renderList = () => {
    if (util.isFunc(customRender)) {
      const custom = customRender({
        direction: listType === 'source' ? 'left' : 'right',
        listType,
        selectedKeys: selectedKeys!,
        value,
        onSelected: onSelectChange,
      });
      if (custom) return custom;
    }

    if (data && data.length === 0) {
      return (
        <div className={listClass} style={{ ...listStyle, height: listHeight }}>
          {renderEmpty()}
        </div>
      );
    }

    return (
      <VirtualList
        className={listClass}
        data={data}
        colNum={colNum}
        keygen={keygen}
        style={{ ...listStyle, height: listHeight }}
        lineHeight={getLineHeight()}
        height={listHeight}
        rowsInView={rowsInView}
        renderItem={renderItem}
      ></VirtualList>
    );
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }
    return <div className={styles.footer}>{footer}</div>;
  };

  return (
    <div className={rootClass}>
      {renderHeader()}
      <Spin className={styles.spinContainer} jssStyle={jssStyle} loading={loading} size={24}>
        {onFilter && renderFilter()}
        {renderList()}
        {renderFooter()}
      </Spin>
    </div>
  );
};

export default TransferList;
