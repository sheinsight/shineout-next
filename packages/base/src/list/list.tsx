import {
  usePersistFn,
  util,
  usePaginationList,
  useListSelectMultiple,
  useInputAble,
} from '@sheinx/hooks';
import classNames from 'classnames';
import { useMemo } from 'react';
import React from 'react';
import { ListProps } from './list.type';
import { VirtualScrollList } from '../virtual-scroll';
import Pagination from '../pagination';
import Checkbox from '../checkbox';
import Spin from '../spin';
import Empty from '../empty';

const emptyArray: any[] = [];

const List = <DataItem, Value extends any[]>(props: ListProps<DataItem, Value>) => {
  const {
    data = emptyArray as DataItem[],
    colNum = 1,
    lineHeight = 32,
    rowsInView = 10,
    pagination = {},
  } = props;
  const listClasses = props.jssStyle?.list?.();

  const inputAble = useInputAble({
    value: props.value,
    onChange: props.onChange,
    control: 'value' in props,
    defaultValue: undefined,
    beforeChange: undefined,
  });

  const { data: pageData, ...pageInfo } = usePaginationList({
    data: data,
    current: pagination.current,
    pageSize: pagination.pageSize,
    defaultCurrent: pagination.defaultCurrent,
    onChange: pagination.onChange,
    shouldPage: !!props.pagination,
    loading: !!props.loading,
  });

  const datum = useListSelectMultiple({
    data: pageData,
    value: inputAble.value,
    format: props.format,
    prediction: props.prediction,
    disabled: props.disabled,
    onChange: inputAble.onChange,
  });
  const columnData = useMemo(() => {
    // 把数组按照colNum分成多个数组
    const result: DataItem[][] = [];
    for (let i = 0; i < pageData.length; i += colNum) {
      result.push(pageData.slice(i, i + colNum));
    }
    return result;
  }, [pageData, colNum]);

  const renderItem = usePersistFn((item: DataItem, index: number) => {
    const key = util.getKey(props.keygen, item, index);
    const shouldRenderCheckbox = props.onChange;
    const rowClass =
      typeof props.rowClassName === 'function'
        ? props.rowClassName(item, index)
        : props.rowClassName;

    const listStyle = {
      width: `${100 / colNum}%`,
      ...props.itemStyle,
    };
    if (props.fixed) {
      listStyle.height = lineHeight;
    }

    return (
      <div key={key} className={classNames(listClasses?.item, rowClass)} style={listStyle}>
        {shouldRenderCheckbox ? (
          <>
            <Checkbox
              jssStyle={props.jssStyle}
              checked={datum.check(item)}
              disabled={datum.disabledCheck(item)}
              onChange={(_value, checked) => {
                if (checked) {
                  datum.add(item);
                } else {
                  datum.remove(item);
                }
              }}
            />
            <div className={listClasses?.checkContent}>
              {util.render(props.renderItem, item, index)}
            </div>
          </>
        ) : (
          util.render(props.renderItem, item, index)
        )}
      </div>
    );
  });

  const renderColumn = usePersistFn((columnData: DataItem[], columnIndex: number) => {
    return (
      <div key={columnIndex} className={listClasses?.row}>
        {columnData.map((item, rowIndex) => {
          const index = rowIndex + columnIndex * colNum;
          return renderItem(item, index);
        })}
      </div>
    );
    return;
  });

  const renderLoading = () => {
    if (!props.loading) return null;
    const Loading =
      props.loading === true ? <Spin size={16} jssStyle={props.jssStyle} /> : props.loading;
    return <div className={listClasses?.loading}>{Loading}</div>;
  };

  const renderEmpty = () => {
    if (data?.length > 0) return null;
    return (
      <div className={listClasses?.empty}>{props.empty || <Empty jssStyle={props.jssStyle} />}</div>
    );
  };

  const renderFooter = () => {
    if (!props.footer) return null;
    return (
      <div className={listClasses?.footer}>
        {typeof props.footer === 'function' ? props.footer() : props.footer}
      </div>
    );
  };

  const handleListScroll = usePersistFn((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollLoading } = props;
    if (typeof scrollLoading !== 'function') return;
    const scrollTop = e.currentTarget.scrollTop;
    if (!scrollTop) return;
    const isEnd = scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight;
    if (isEnd) {
      scrollLoading();
    }
  });

  const handleVirtualScroll = usePersistFn((info: { y: number }) => {
    const { scrollLoading } = props;
    if (typeof scrollLoading !== 'function') return;
    if (info.y === 1) {
      scrollLoading();
    }
  });

  const renderList = () => {
    if (props.fixed)
      return (
        <>
          <VirtualScrollList
            data={columnData}
            renderItem={renderColumn}
            lineHeight={lineHeight}
            rowsInView={rowsInView}
            onScroll={handleVirtualScroll}
            height={'auto'}
            style={{ flex: '1', minHeight: '0', display: 'flex' }}
            scrollerStyle={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'auto' }}
          />
          {renderFooter()}
        </>
      );

    return (
      <div className={listClasses?.scrollContainer} onScroll={handleListScroll}>
        {columnData.map((column, colIndex) => {
          return renderColumn(column, colIndex);
        })}
        {renderFooter()}
      </div>
    );
  };

  const wrapperClass = classNames(
    props.className,
    listClasses?.wrapper,
    props.bordered && listClasses?.wrapperBordered,
    props.size === 'small' && listClasses?.wrapperSmall,
    props.size === 'large' && listClasses?.wrapperLarge,
    props.striped && listClasses?.wrapperStriped,
  );
  const wrapperStyle = { ...props.style, height: props.height };

  return (
    <>
      <div className={wrapperClass} style={wrapperStyle}>
        {renderList()}
        {renderLoading()}
        {renderEmpty()}
      </div>
      {props.pagination && (
        <Pagination
          className={listClasses?.pagination}
          jssStyle={props.jssStyle}
          {...pageInfo}
          {...pagination}
        />
      )}
    </>
  );
};

export default List;
