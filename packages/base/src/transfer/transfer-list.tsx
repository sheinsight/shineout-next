import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { util, KeygenResult } from '@sheinx/hooks';
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
    info,
    renderItem,
    footer,
    keygen,
    listHeight = 180,
    lineHeight = 34,
    listType,
    itemsInView = 20,
    colNum = 1,
    empty,
    filterText,
    onFilter,
    onSelect,
    onSelectAll,
    // onChange,
  } = props;

  const { data, selectedKeys, disabledKeys } = info;
  const [currentIndex, setCurrentIndex] = useState(0);
  const virtualRef = useRef<VirtualRefType>();

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.view);

  const getScrollHeight = () => {
    const rows = Math.ceil(data.length / colNum);
    return rows * lineHeight;
  };

  const handleChange = (key: KeygenResult, checked: boolean) => {
    onSelect(key, checked);
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
        info={info}
        keygen={keygen}
        onSelectAll={onSelectAll}
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
                  keygen={keygen}
                  lineHeight={lineHeight}
                  checked={selectedKeys.has(key)}
                  renderItem={renderItem}
                  onChange={handleChange}
                  disabled={disabledKeys.includes(d)}
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
    return <div className={styles.footer}>Footer</div>;
  };

  useEffect(() => {
    virtualRef.current?.reset();
  }, [filterText]);

  return (
    <div className={rootClass}>
      {renderHeader()}
      {renderFilterInput()}
      {renderList()}
      {renderFooter()}
    </div>
  );
};

export default TransferList;
