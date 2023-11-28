import React, { useRef } from 'react';
import classNames from 'classnames';
import { usePersistFn, usePopup, useSelect, useFilter } from '@sheinx/hooks';
import { SelectClasses } from '@sheinx/shineout-style';
import { SelectProps } from './select.type';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import Result from './result';
import List from './list';
import TreeList from './list-tree';
import Icons from '../icons';
import ColumnsList from './list-columns';

/**
 *
 * 大小尺寸
 * 禁用状态（全体）
 * 创建选项
 * 树选择
 * 加载中
 * 自定义下拉列表
 * 限制字符长度
 * 可清除
 * 分组
 *
 */

const Select = <DataItem, Value>(props: SelectProps<DataItem, Value>) => {
  const {
    jssStyle,
    className,
    size,
    data,
    format,
    value: valueProp,
    defaultValue,
    prediction,
    innerTitle,
    underline,
    border = true,
    status,
    columns = 1,
    columnWidth = 160,
    width,
    multiple,
    keygen,
    focusSelected = true,
    optionWidth = '100%',
    height = 250,
    open: openProp,
    position: positionProp = 'bottom-left',
    lineHeight,
    itemsInView,
    disabled,
    clearable = true,
    beforeChange,
    compressed,
    compressedBound,
    placeholder,
    groupBy,
    renderItem,
    renderResult: renderResultProp,
    renderUnmatched,
    resultClassName,
    onChange,
    onFilter: onFilterProp,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const inputRef = useRef<HTMLInputElement>();

  const rootClass = classNames(
    className,
    styles?.wrapper,
    innerTitle && styles?.wrapperInnerTitle,
    size === 'small' && styles?.wrapperSmall,
    size === 'large' && styles?.wrapperLarge,
    status === 'error' && styles?.wrapperError,
    clearable && styles?.clearable,
    !border && styles?.wrapperNoBorder,
    !!underline && styles?.wrapperUnderline,
    {
      [styles?.multiple]: multiple,
    },
  );

  const { filterText, filterData, onFilter, onResetFilter } = useFilter({
    data,
    onFilter: onFilterProp,
  });

  const { datum, value } = useSelect<DataItem, Value>({
    value: valueProp,
    data,
    multiple,
    defaultValue,
    control: 'value' in props,
    format,
    disabled,
    groupBy,
    prediction,
    beforeChange,
    onChange,
  });

  const onCollapse = usePersistFn((isOpen: boolean) => {
    console.log(isOpen);
  });

  const { open, position, targetRef, popupRef, openPop, closePop } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp,
  });

  const handleResultClick = usePersistFn(() => {
    openPop();
    inputRef.current?.focus();
  });

  const renderInnerTitle = useInnerTitle({
    open,
    size,
    jssStyle,
    innerTitle,
  });

  const getRenderResult = (data: DataItem, index?: number) => {
    if (!renderResultProp) return renderItem(data, index);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data, index)
      : data[renderResultProp];
  };

  const renderClearable = () => {
    return <span className={styles.clearIcon}>{Icons.PcCloseCircleFill}</span>;
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result
          jssStyle={jssStyle}
          datum={datum}
          value={value}
          data={filterData}
          focus={open}
          keygen={keygen}
          disabled={disabled}
          compressed={compressed}
          compressedBound={compressedBound}
          multiple={multiple}
          placeholder={placeholder}
          prediction={prediction}
          renderItem={renderItem}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
          allowOnFilter={'onFilter' in props}
          focusSelected={focusSelected}
          filterText={filterText}
          onFilter={onFilter}
          onRef={inputRef}
          onResetFilter={onResetFilter}
        ></Result>
        {clearable && renderClearable()}
      </div>
    );

    return (
      <div
        ref={targetRef}
        className={classNames(
          styles?.resultWrapper,
          styles?.wrapperPaddingBox,
          styles?.wrapperInnerTitleTop,
          styles?.wrapperInnerTitleBottom,
        )}
        onClick={handleResultClick}
      >
        {renderInnerTitle(result)}
      </div>
    );
  };

  const renderList = () => {
    const listProps = {
      data: filterData,
      datum,
      value,
      size,
      originalData: data,
      keygen,
      width,
      height,
      jssStyle,
      multiple,
      optionWidth,
      lineHeight,
      columnWidth,
      itemsInView,
      renderItem,
      closePop,
    };
    // 自定义列
    if (('columns' in props && typeof columns === 'number' && columns! >= 1) || columns === -1) {
      return <ColumnsList columns={columns} {...listProps}></ColumnsList>;
    }

    return <List {...listProps}></List>;
  };

  const renderTreeList = () => {
    return <TreeList></TreeList>;
  };

  const renderOptions = () => {
    if ('treeData' in props) {
      return renderTreeList();
    }
    return renderList();
  };

  return (
    <div data-soui-type={'input'} className={rootClass}>
      {renderResult()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth={false}
        absolute={props.absolute}
        zIndex={props.zIndex}
        position={position}
        popupGap={4}
        popupEl={popupRef.current}
        parentElement={targetRef.current}
      >
        <AnimationList
          onRef={popupRef}
          show={open}
          className={classNames(styles?.pickerWrapper)}
          display={'block'}
          type={'fade'}
          duration={'fast'}
          style={{ width: columns > 1 ? columns * columnWidth : '100%' }}
        >
          {renderOptions()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default Select;
