import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import { KeygenResult, util } from '@sheinx/hooks';
import { CascaderClasses } from './cascader.type';
import { VirtualScrollList } from '../virtual-scroll';
import { VirtualListType } from '../virtual-scroll/virtual-scroll-list.type';
import { FilterListProps } from './filter-list.type';
import FilterNode from './filter-node';
import Spin from '../spin';

const FilterList = <DataItem, Value extends KeygenResult[]>(
  props: FilterListProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    data,
    datum,
    loading,
    childrenKey,
    keygen,
    wideMatch,
    virtual,
    height,
    size,
    isRealtime,
    shouldFinal,
    filterFunc,
    renderItem: renderItemProp,
    renderOptionList,
    setInputText,
    setFilterText,
    onChange,
    onPathChange,
  } = props;
  const styles = jssStyle?.cascader?.() as CascaderClasses;

  const virtualRef = useRef<VirtualListType>({
    scrollByStep: undefined,
    getCurrentIndex: undefined,
    getHoverIndex: undefined,
  });

  const lineHeight = useMemo(() => {
    // if (lineHeightProp && lineHeightProp !== 'auto') return lineHeightProp;
    const diff = util.getBaseFontSizeDiff();
    const sizeMap = { small: 26, default: 34, large: 42 };
    return (sizeMap[size as keyof typeof sizeMap] || 34) - diff;
  }, [size]);

  const getKey = (path: DataItem[]) => {
    return path.map((d) => datum.getKey(d)).join('-');
  };

  const getWideMatch = (list: DataItem[][]) => {
    return list.filter((arr) => arr.some((item) => filterFunc?.(item)));
  };

  const renderItem = (item: DataItem[]) => {
    return (
      <FilterNode
        jssStyle={jssStyle}
        key={getKey(item)}
        data={item}
        datum={datum}
        shouldFinal={shouldFinal}
        renderItem={renderItemProp}
        setInputText={setInputText}
        setFilterText={setFilterText}
        onChange={onChange}
        onPathChange={onPathChange}
      />
    );
  };

  const renderLoading = () => {
    return <Spin jssStyle={jssStyle}></Spin>;
  };

  const renderVirtualList = () => {
    let list = util.getFlattenTree(data, childrenKey, wideMatch);
    if (wideMatch) {
      list = getWideMatch(list);
    }
    return (
      <VirtualScrollList
        virtualRef={virtualRef}
        data={list as DataItem[]}
        keygen={keygen}
        rowsInView={20}
        height={height}
        lineHeight={lineHeight}
        renderItem={renderItem}
      ></VirtualScrollList>
    );
  };

  const renderSimpleList = () => {
    let list = util.getFlattenTree(data, childrenKey, wideMatch);
    if (wideMatch) {
      list = getWideMatch(list);
    }
    return list.map((item) => {
      return (
        <FilterNode
          jssStyle={jssStyle}
          key={getKey(item)}
          isRealtime={isRealtime}
          data={item}
          datum={datum}
          shouldFinal={shouldFinal}
          renderItem={renderItemProp}
          setInputText={setInputText}
          setFilterText={setFilterText}
          onChange={onChange}
          onPathChange={onPathChange}
        />
      );
    });
  };

  const renderList = () => {
    if (loading) return renderLoading();

    return (
      <div className={clsx(styles.list)}>
        {virtual ? renderVirtualList() : renderSimpleList()}
      </div>
    );
  };

  const renderEmpety = () => {
    return <span>noData</span>;
  };

  if (!data || data.length === 0) return renderEmpety();

  const list = renderList();
  return renderOptionList ? renderOptionList(list, { loading: !!loading }) : list;
};

export default FilterList;
