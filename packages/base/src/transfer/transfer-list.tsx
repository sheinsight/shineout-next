import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { VirtualRefType } from '../virtual-scroll/virtual-scroll.type';
import { TransferClasses } from './transfer.type';
import { TransferListProps } from './transfer-list.type';
import TransferListItem from './transfer-list-item';
import TransferListHeader from './transfer-list-header';
import Empty from '../empty';
import Input from '../input';
import VirtualScroll from '../virtual-scroll';
import Icons from '../icons';

const TransferList = <DataItem,>(props: TransferListProps<DataItem>) => {
  const {
    jssStyle,
    datum,
    listDatum,
    data,
    value,
    renderItem,
    keygen,
    listHeight = 180,
    lineHeight = 34,
    listType,
    itemsInView = 20,
    colNum = 1,
    empty,
    title,
    footer,
    filterText,
    simple,
    onFilter,
    onSelectAll,
    onRemoveAll,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const virtualRef = useRef<VirtualRefType>();

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.view, {
    [styles.source]: listType === 'source',
    [styles.target]: listType === 'target',
  });

  // const getData = () => {
  //   if (!onFilter || !filterText) {
  //     return data;
  //   }
  //   const isSource = listType === 'source';
  //   const filterData = data.filter((item: DataItem) => onFilter(filterText, item, isSource));
  //   return filterData;
  // };

  const getScrollHeight = () => {
    const rows = Math.ceil(data.length / colNum);
    return rows * lineHeight;
  };

  const handleScroll = (x: number, y: number) => {
    const current = Math.floor(y / lineHeight);
    setCurrentIndex(current);
  };

  const handleFilter = (v?: string) => {
    onFilter(v, listType);
  };

  const renderHeader = () => {
    return (
      <TransferListHeader
        jssStyle={jssStyle}
        keygen={keygen}
        title={title}
        datum={datum}
        data={data}
        value={value}
        listDatum={listDatum}
        listType={listType}
        simple={simple}
        onSelectAll={onSelectAll}
        onRemoveAll={onRemoveAll}
      ></TransferListHeader>
    );
  };

  const renderFilterInput = () => {
    return (
      <div className={styles.input}>
        <Input
          clearable
          jssStyle={jssStyle}
          delay={400}
          value={filterText}
          onChange={handleFilter}
          suffix={Icons.Search}
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
    const end = (currentIndex + itemsInView) * colNum;
    let items = data.slice(start, end);
    const scrollHeight = getScrollHeight();

    return (
      <div className={styles.list} style={{ height: listHeight }}>
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
            {items.map((d, i) => {
              const key = util.getKey(keygen, d, i);
              return (
                <TransferListItem
                  key={key}
                  jssStyle={jssStyle}
                  data={d}
                  datum={datum}
                  listDatum={listDatum}
                  simple={simple}
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
      {onFilter && renderFilterInput()}
      {renderList()}
      {renderFooter()}
    </div>
  );
};

export default TransferList;
