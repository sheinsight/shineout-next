import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { util, KeygenResult } from '@sheinx/hooks';
import { getLocale, useConfig } from '../config';
import { VirtualRefType } from '../virtual-scroll/virtual-scroll.type';
import { TransferClasses } from './transfer.type';
import { TransferListProps } from './transfer-list.type';
import TransferListItem from './transfer-list-item';
import TransferListHeader from './transfer-list-header';
import Empty from '../empty';
import Input from '../input';
import Spin from '../spin';
import VirtualScroll from '../virtual-scroll';

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
    renderItem,
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
    renderFilter: renderFilterProp,
    searchPlaceholder,
    onFilter,
  } = props;
  const { locale } = useConfig();

  const [currentIndex, setCurrentIndex] = useState(0);
  const virtualRef = useRef<VirtualRefType>();

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

  const getScrollHeight = () => {
    const rows = Math.ceil(data.length / colNum);
    return rows * lineHeight;
  };

  const handleScroll = (x: number, y: number) => {
    const current = Math.floor(y / lineHeight);
    setCurrentIndex(current);
  };

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
        reset={virtualRef.current?.reset}
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
      <div className={styles.input}>
        <Input
          clearable
          jssStyle={jssStyle}
          delay={400}
          value={filterText}
          onChange={handleFilter}
          placeholder={searchPlaceholder || getLocale(locale, 'search')}
          // suffix={Icons.Search}
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

  const renderList = () => {
    const start = currentIndex * colNum;
    const end = (currentIndex + rowsInView) * colNum;
    let items = data.slice(start, end);
    const scrollHeight = getScrollHeight();

    return (
      <div className={listClass} style={{ ...listStyle, height: listHeight }}>
        {items.length > 0 && (
          <VirtualScroll
            virtualRef={virtualRef}
            jssStyle={jssStyle}
            height={listHeight}
            scrollWidth={0}
            scrollHeight={scrollHeight}
            translate={currentIndex * lineHeight}
            onScroll={handleScroll}
          >
            <div style={{ height: currentIndex * lineHeight, gridColumnEnd: '-1' }} />
            {items.map((d: DataItem, i: number) => {
              const key = util.getKey(keygen, d, i);
              return (
                <TransferListItem
                  key={key}
                  jssStyle={jssStyle}
                  size={size}
                  data={d}
                  datum={datum}
                  listDatum={listDatum}
                  simple={simple}
                  itemClass={itemClass}
                  listType={listType}
                  keygen={keygen}
                  lineHeight={lineHeight}
                  renderItem={renderItem}
                  disabled={datum.disabledCheck(d)}
                />
              );
            })}
          </VirtualScroll>
        )}
        {data && data.length === 0 && renderEmpty()}
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }
    return <div className={styles.footer}>{footer}</div>;
  };

  useEffect(() => {
    virtualRef.current?.reset();
  }, [filterText]);

  return (
    <div className={rootClass}>
      {renderHeader()}
      <Spin jssStyle={jssStyle} name='ring' loading={loading} size={24}>
        {onFilter && renderFilter()}
        {renderList()}
        {renderFooter()}
      </Spin>
    </div>
  );
};

export default TransferList;
