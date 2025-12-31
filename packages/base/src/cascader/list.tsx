import { useMemo, useRef } from 'react';
import clsx from 'clsx';
import { KeygenResult } from '@sheinx/hooks';
import { VirtualScrollList } from '../virtual-scroll';
import { VirtualListType } from '../virtual-scroll/virtual-scroll-list.type';
import { CascaderClasses } from './cascader.type';
import { CascaderListProps } from './list.type';
import Node from './node';
import { util } from '@sheinx/hooks';

const { devUseWarning } = util;

const CascaderList = <DataItem, Value extends KeygenResult[]>(
  props: CascaderListProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    data,
    keygen,
    parentId,
    datum,
    loader,
    onChange,
    onPathChange,
    multiple,
    expandTrigger,
    childrenKey,
    shouldFinal,
    path,
    mode,
    size,
    virtual,
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

  const getHeight = () => {
    if (props.height) return props.height;
    return lineHeight * 7;
  };

  const height = getHeight();

  // 和 datum 中的 geyKey 不一样，根据 parentId 生成唯一的 key
  const getKey = (item: DataItem, index: number): KeygenResult => {
    if (typeof keygen === 'function') return keygen(item, parentId);
    if (keygen && typeof keygen === 'string') {
      const key = item[keygen];
      if (typeof key === 'string' || typeof key === 'number') {
        return key;
      }
      devUseWarning.error(`key must be number or string but get ${key}`);
    }
    return parentId + (parentId ? ',' : '') + index;
  };

  const renderEmpety = () => {
    return <span>noData</span>;
  };

  const renderItem = (item: DataItem, index: number) => {
    const id = getKey(item, index);
    return (
      <Node
        key={id}
        jssStyle={jssStyle}
        active={props.id === id}
        id={id}
        data={item}
        datum={datum}
        renderItem={props.renderItem}
        keygen={keygen}
        loader={loader}
        onPathChange={onPathChange}
        onChange={onChange}
        multiple={multiple}
        mode={mode}
        expandTrigger={expandTrigger}
        childrenKey={childrenKey}
        shouldFinal={shouldFinal}
        parentId={parentId}
        path={path}
      />
    );
  };

  const renderSimpleList = () => {
    return data.map(renderItem);
  };

  const renderVritualList = () => {
    return (
      <VirtualScrollList
        virtualRef={virtualRef}
        data={data}
        keygen={keygen}
        renderItem={renderItem}
        rowsInView={20}
        height={height}
        lineHeight={lineHeight}
        paddingY={3}
      ></VirtualScrollList>
    );
  };

  if (!data || data.length === 0) return renderEmpety();

  return (
    <div className={clsx(styles.list, !virtual && styles.listSimple )}>
      {virtual ? renderVritualList() : renderSimpleList()}
    </div>
  );
};

export default CascaderList;
