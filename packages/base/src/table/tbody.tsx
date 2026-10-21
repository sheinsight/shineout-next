import React, { useMemo } from 'react';
import { useTableRow, useTableExpand, util, useComponentMemo } from '@sheinx/hooks';
import Tr from './tr';
import { TbodyProps } from './tbody.type';

const hasExpandColumn = (props: TbodyProps) =>
  !!props.expandHideCol ||
  (props.columns || []).some((col) => col.type === 'expand' || col.type === 'row-expand');

// bodyScrollWidth / resizeFlag 在行内只用于虚拟列表上报行高；
// 展开行渲染时会读取容器宽度下发给嵌套表格，有展开列时也需要随之重渲染。
// 其余场景不再下发，Table 布局状态变化时 Tbody / Tr 都可以跳过渲染
const needLayoutProps = (props: TbodyProps) => !!props.virtual || hasExpandColumn(props);

const Tbody = (props: TbodyProps) => {
  const { columns = [], currentRowIndex = 0, currentColIndex, hover = true } = props;
  const passLayout = needLayoutProps(props);
  const { isRowExpand, handleExpandClick } = useTableExpand({
    columns: props.columns,
    expandKeys: props.expandKeys,
    keygen: props.keygen,
  });

  const { rowData, handleCellHover, hoverIndex, rowSelectMergeStartData } = useTableRow({
    columns: props.columns,
    data: props.data,
    currentIndex: currentRowIndex,
    hover,
    originData: props.originData,
    rowSpanIndexArray: props.rowSpanIndexArray,
  });

  const expandCol = (props.expandHideCol ||
    columns.find(
      (col) => col.type === 'expand' || col.type === 'row-expand',
    )) as typeof props.expandHideCol;

  // 样式 hook 在 Tbody 统一调用一次再下发给 Tr，
  // 避免每一行都执行 9 次 react-jss useStyles（每次都带 useLayoutEffect/useEffect），行数多时开销明显
  const { jssStyle } = props;
  const tableClasses = jssStyle?.table?.();
  const inputWrapper = jssStyle?.input?.().wrapper;
  const selectWrapper = jssStyle?.select?.().wrapper;
  const datePickerWrapper = jssStyle?.datePicker?.().wrapper;
  const treeSelectWrapper = jssStyle?.treeSelect?.().wrapper;
  const switchWrapper = jssStyle?.switch?.().wrapper;
  const checkboxWrapper = jssStyle?.checkbox?.().wrapper;
  const radioWrapper = jssStyle?.radio?.().wrapper;
  const cascaderWrapper = jssStyle?.cascader?.().wrapper;
  // 行点击时用于判断点击目标是否为表单控件（不触发 onRowClick / 行展开）
  const preventClasses = useMemo(
    () => [
      inputWrapper,
      selectWrapper,
      datePickerWrapper,
      treeSelectWrapper,
      switchWrapper,
      checkboxWrapper,
      radioWrapper,
      cascaderWrapper,
    ],
    [
      inputWrapper,
      selectWrapper,
      datePickerWrapper,
      treeSelectWrapper,
      switchWrapper,
      checkboxWrapper,
      radioWrapper,
      cascaderWrapper,
    ],
  );

  const renderRow = (item: any, index: number) => {
    const rowIndex = index + currentRowIndex;
    const originKey = util.getKey(props.keygen, item, rowIndex);
    const trRenderKey =
      props.loader || props.rowEvents?.draggable ? originKey : `${originKey}-${rowIndex}`;

    return (
      <Tr
        key={trRenderKey}
        originKey={originKey}
        row={rowData[index]}
        columns={columns}
        jssStyle={props.jssStyle}
        tableClasses={tableClasses}
        preventClasses={preventClasses}
        rowClassName={props.rowClassName}
        rawData={item}
        rowIndex={rowIndex}
        expandCol={expandCol}
        rowClickExpand={!!expandCol && (expandCol.hide || expandCol.type === 'row-expand')}
        handleExpandClick={handleExpandClick}
        expanded={isRowExpand(item, rowIndex)}
        datum={props.datum}
        treeFunc={props.treeFunc}
        treeExpandLevel={props.treeExpandLevel}
        treeEmptyExpand={props.treeEmptyExpand}
        expandIcon={props.expandIcon}
        treeExpandIcon={props.treeExpandIcon}
        loader={props.loader}
        isEmptyTree={props.isEmptyTree}
        treeColumnsName={props.treeColumnsName}
        setRowHeight={props.setRowHeight}
        striped={props.striped}
        radio={props.radio}
        hover={hover}
        isSelect={props.datum.check(rowSelectMergeStartData[index])}
        rowSelectMergeStartData={rowSelectMergeStartData[index]}
        handleCellHover={handleCellHover}
        hoverIndex={hoverIndex}
        rowClickAttr={props.rowClickAttr}
        onRowClick={props.onRowClick}
        rowEvents={props.rowEvents}
        disabled={props.datum.disabledCheck(item)}
        bodyScrollWidth={passLayout ? props.bodyScrollWidth : undefined}
        scrollRef={props.scrollRef}
        resizeFlag={passLayout ? props.resizeFlag : undefined}
        treeCheckAll={props.treeCheckAll}
        onCellClick={props.onCellClick}
        virtual={props.virtual}
        scrolling={props.scrolling}
        strictRowHeight={props.strictRowHeight}
        rowMemo={props.rowMemo}
        bodyRowSemClass={props.bodyRowSemClass}
        bodyRowSemStyle={props.bodyRowSemStyle}
        bodyCellSemClass={props.bodyCellSemClass}
        bodyCellSemStyle={props.bodyCellSemStyle}
      />
    );
  };
  const $tbody = <tbody>{(props.data || []).map((item, index) => renderRow(item, index))}</tbody>;

  // 未传 shouldUpdate 时直接返回最新结果，非 lazy 模式下行为与不做缓存一致
  return useComponentMemo(
    () => $tbody,
    [currentRowIndex, currentColIndex, props.data],
    props.virtual === 'lazy'
      ? (prev: any, next: any) => {
          return (
            prev.some((_: any, index: number) => {
              return !util.shallowEqual(prev?.[index], next?.[index]);
            }) || !props.scrolling
          );
        }
      : undefined,
  );
};

// 语义化样式每次渲染都会生成新对象，按内容比较
const SEM_STYLE_KEYS = ['bodyRowSemStyle', 'bodyCellSemStyle'];
const LAYOUT_KEYS = ['bodyScrollWidth', 'resizeFlag'];

// 仅在开启 rowMemo 时生效，未开启时始终返回 false，行为与不做 memo 完全一致。
// rowMemo 下 Tbody 的 props 不变时，下发给每一行的 props 也不变，行本来就会被 Tr 的 memo 跳过；
// 在 Tbody 这层直接跳过，省去 Table 自身布局状态（列宽测量、横向滚动、滚动阴影等）变化时逐行生成元素和比较 props 的开销
const isTbodyPropsEqual = (prev: TbodyProps, next: TbodyProps) => {
  if (!prev.rowMemo || !next.rowMemo) return false;
  const skip = needLayoutProps(next) ? SEM_STYLE_KEYS : [...SEM_STYLE_KEYS, ...LAYOUT_KEYS];
  return (
    util.shallowEqual(prev, next, { skip }) &&
    util.shallowEqual(prev.bodyRowSemStyle, next.bodyRowSemStyle) &&
    util.shallowEqual(prev.bodyCellSemStyle, next.bodyCellSemStyle)
  );
};

export default React.memo(Tbody, isTbodyPropsEqual);
