import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { KeygenResult, usePersistFn } from '@sheinx/hooks';
import { SelectClasses, BaseListProps } from './select.type';
import { VirtualScrollList } from '../virtual-scroll';
import ListOption from './list-option';
import { VirtualListType } from '../virtual-scroll/virtual-scroll-list.type';

const List = <DataItem, Value>(props: BaseListProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    size,
    keygen,
    datum,
    multiple,
    groupKey,
    itemsInView = 10,
    lineHeight: lineHeightProp,
    threshold,
    controlType,
    hideCreateOption,
    optionListRef,
    isAnimationFinish,
    renderItem: renderItemProp = (d) => d as React.ReactNode,
    closePop,
    onControlTypeChange,
    onOptionClick,
  } = props;

  const dynamicVirtual = lineHeightProp === 'auto';
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles.list, {
    [styles.controlMouse]: controlType === 'mouse',
    [styles.controlKeyboard]: controlType === 'keyboard',
    [styles.dynamicList]: dynamicVirtual,
    [styles.multipleList]: multiple,
  });
  const [hoverIndex, setHoverIndex] = useState(hideCreateOption ? -1 : 0);
  const virtualRef = useRef<VirtualListType>({
    scrollByStep: undefined,
    getCurrentIndex: undefined,
    getHoverIndex: undefined,
  });

  const getHoverIndex = usePersistFn(() => {
    return hoverIndex;
  });

  const getLineHeight = () => {
    if (lineHeightProp && lineHeightProp !== 'auto') return lineHeightProp;
    if (size === 'small') return 26;
    if (size === 'default') return 34;
    if (size === 'large') return 42;
    return 34;
  };

  const lineHeight = getLineHeight();

  const getHeight = () => {
    if (props.height) return props.height;
    return lineHeight * 7;
  };

  const height = getHeight();

  const handleHover = usePersistFn((index: number, force?: boolean) => {
    if ((controlType === 'mouse' || force) && hoverIndex !== index) {
      setHoverIndex(index);
    }
  });

  const handleHoverByStep = usePersistFn((step: number) => {
    const next = hoverIndex + step;
    handleHover(next, true);
  });

  const handleMove = usePersistFn((step: number, force?: boolean) => {
    if (force) {
      setHoverIndex(step);
      virtualRef.current?.scrollByStep?.(step);
      return;
    }
    const max = data.length;
    const listHeight = height as number;
    let nextHoverIndex = hoverIndex;
    const currentHoverData = data[hoverIndex];
    // 遇到 group item 数据时，跳过
    if (currentHoverData && currentHoverData[groupKey as keyof DataItem]) {
      if (step > 0) nextHoverIndex += 1;
      else nextHoverIndex -= 1;
    }

    nextHoverIndex = nextHoverIndex + step;
    if (nextHoverIndex >= max) {
      nextHoverIndex = 0;
    }

    if (nextHoverIndex < 0) nextHoverIndex = max;

    setHoverIndex(nextHoverIndex);
    const currentIndex = virtualRef.current.getCurrentIndex?.() as number;
    // 列表中，能容纳完整高度项的个数
    const maxViewCount = Math.floor(listHeight / lineHeight);
    // 列表中，未完全展示的那一项被遮挡部分的高度
    const overViewHeight = Math.ceil(listHeight / lineHeight) * lineHeight - listHeight;

    const top = virtualRef.current.getTop?.() as number;

    // 触底，回到顶部
    if (nextHoverIndex === 0) {
      virtualRef.current.scrollByStep?.(-currentIndex, 0);
      return;
    }

    if (nextHoverIndex === max) {
      virtualRef.current.scrollByStep?.(nextHoverIndex, overViewHeight);
      return;
    }

    // 向上滚动一格
    if (nextHoverIndex <= currentIndex) {
      virtualRef.current.scrollByStep?.(
        nextHoverIndex === currentIndex ? 0 : -1,
        top !== 0 ? 0 : undefined,
      );
    }

    // 向下滚动一格
    if (maxViewCount && listHeight % lineHeight !== 0 && listHeight % lineHeight !== listHeight) {
      if (nextHoverIndex >= currentIndex + maxViewCount) {
        virtualRef.current.scrollByStep?.(
          nextHoverIndex === currentIndex + maxViewCount ? 0 : 1,
          overViewHeight,
        );
      }
    }
  });

  const handleVirtualScroll = usePersistFn(async (info: { y: number }) => {
    const { onLoadMore } = props;
    if (typeof onLoadMore !== 'function') return;
    if (!onLoadMore) return;
    if (info.y >= threshold) {
      await onLoadMore();
    }
  });

  const renderItem = (
    item: DataItem,
    index: number,
    key: KeygenResult,
    setRowHeight: (index: number, height: number) => void,
  ) => {
    return (
      <React.Fragment key={key}>
        <ListOption
          datum={datum}
          closePop={closePop}
          jssStyle={jssStyle}
          index={index}
          data={item}
          isAnimationFinish={isAnimationFinish}
          setRowHeight={setRowHeight}
          lineHeight={lineHeight}
          isHover={hoverIndex === index}
          multiple={multiple}
          dynamicVirtual={dynamicVirtual}
          renderItem={renderItemProp}
          onHover={handleHover}
          onOptionClick={onOptionClick}
        ></ListOption>
      </React.Fragment>
    );
  };

  const renderGroupTitle = (d: { [key: string]: string }) => {
    const title = d[groupKey as keyof typeof d];
    return (
      <div className={styles.optionGroupTitle} title={title}>
        {title}
      </div>
    );
  };

  const renderList = () => {
    return (
      <VirtualScrollList
        virtualRef={virtualRef}
        data={data}
        keygen={keygen}
        tag={'ul'}
        groupKey={groupKey}
        dynamicVirtual={dynamicVirtual}
        tagClassName={styles.virtualList}
        height={height}
        onScroll={handleVirtualScroll}
        lineHeight={lineHeight}
        rowsInView={itemsInView}
        renderItem={renderItem}
        customRenderItem={renderGroupTitle}
        onControlTypeChange={onControlTypeChange}
        paddingY={3}
      ></VirtualScrollList>
    );
  };

  useEffect(() => {
    if (optionListRef) {
      optionListRef.current = {
        hoverMove: handleMove,
        hoverHover: handleHoverByStep,
        getHoverIndex: getHoverIndex,
      };
    }
  }, []);

  return <div className={rootClass}>{renderList()}</div>;
};

export default List;
