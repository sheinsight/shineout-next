import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import {
  util,
  usePersistFn,
  usePopup,
  useSelect,
  useFilter,
  useGroup,
  OptionalToRequired,
  UnMatchedData,
} from '@sheinx/hooks';
import { SelectClasses } from '@sheinx/shineout-style';
import { SelectProps, OptionListRefType } from './select.type';
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
 * 创建选项
 * 树选择
 * 加载中
 * 自定义下拉列表
 * 限制字符长度
 * 可清除
 *
 */

const Select = <DataItem, Value>(props: OptionalToRequired<SelectProps<DataItem, Value>>) => {
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
    columnsTitle,
    columnWidth = 160,
    width,
    style,
    multiple,
    keygen,
    focusSelected = true,
    optionWidth = '100%',
    height,
    open: openProp,
    position: positionProp = 'bottom-left',
    lineHeight,
    itemsInView,
    disabled,
    clearable = true,
    beforeChange,
    compressed,
    compressedBound,
    compressedClassName,
    placeholder,
    autoAdapt,
    groupBy,
    renderItem = (d) => d,
    renderResult: renderResultProp,
    renderUnmatched,
    resultClassName,
    hideCreateOption,
    filterSingleSelect,
    onChange,
    onCreate: onCreateProp,
    onFilter: onFilterProp,
    onBlur,
    onFocus,
    onEnterExpand,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootStyle: React.CSSProperties = {
    ...style,
    width,
  };
  const [controlType, setControlType] = useState<'mouse' | 'keyboard'>('mouse');
  const [focused, setFocused] = useState(false);

  const isKeydown = useRef(false);
  const inputRef = useRef<HTMLInputElement>();
  const selectRef = useRef<HTMLDivElement>();
  const optionListRef = useRef<OptionListRefType>();

  const {
    filterText,
    inputText,
    filterData,
    createdData,
    onFilter,
    onResetFilter,
    onCreate,
    onClearCreatedData,
  } = useFilter({
    data,
    onCreate: onCreateProp,
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

  const { data: groupData, groupKey } = useGroup({
    data: filterData,
    groupBy,
  });

  const onCollapse = usePersistFn(() => {});

  const { open, position, targetRef, popupRef, openPop, closePop } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp,
  });

  const rootClass = classNames(
    className,
    styles?.wrapper,
    disabled && styles?.wrapperDisabled,
    !!open && styles?.wrapperFocus,
    focused && styles?.wrapperFocus,
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

  const handleFocus = usePersistFn((e: React.FocusEvent) => {
    setFocused(true);
    onFocus?.(e);
  });

  const handleBlur = usePersistFn((e: React.FocusEvent) => {
    setFocused(false);
    onBlur?.(e);
  });

  const handleChange = (item: DataItem) => {
    if (multiple) {
      let unMatchData = item as UnMatchedData;

      if (util.isObject(item) && unMatchData.IS_NOT_MATCHED_VALUE) {
        datum.remove(item);
      } else {
        const checked = datum.check(item);
        if (checked) datum.remove(item);
        else datum.add(item);
      }
      return;
    }

    datum.add(item);

    // 关闭后聚焦外层容器，以便继续键盘操作
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  // 点击 Select 结果框的处理方法
  const handleResultClick = usePersistFn(() => {
    if (disabled === true) return;
    openPop();
    inputRef.current?.focus();
  });

  // 创建选项时，开启隐藏创建项目后的处理方法
  const handleHideOption = () => {
    handleChange(createdData as DataItem);
  };

  // 回车时的处理方法
  const handleEnter = () => {
    const hoverIndex = optionListRef.current?.getHoverIndex() || 0;
    if (onCreate && hideCreateOption && hoverIndex === -1) {
      handleHideOption();
      return;
    }

    const currentDataItem = filterData[hoverIndex];
    if (currentDataItem && !currentDataItem[groupKey as keyof typeof currentDataItem]) {
      isKeydown.current = true;
      handleChange(currentDataItem);
      inputRef.current?.blur();
      if (!multiple) closePop();
      onClearCreatedData();
    }
  };

  // input blur 时的处理方法
  const handleInputBlur = (text: string) => {
    if (onFilterProp && text && filterSingleSelect && data.length === 1) {
      handleChange(data[0]);
      return;
    }
    if (!onCreate) return;
    if (multiple && !text) return;
    if (isKeydown.current) {
      isKeydown.current = false;
      return;
    }
    handleChange(createdData as DataItem);
  };

  const handleDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!multiple) return;
    console.log(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 回车或下箭头可打开下拉列表
    if (
      (e.keyCode === 13 || e.code === 'Enter' || e.keyCode === 13 || e.code === 'ArrowDown') &&
      !open
    ) {
      if (typeof onEnterExpand === 'function') {
        const canOpen = onEnterExpand(e);
        if (canOpen === false) return;
      }
      handleResultClick();
      return;
    }

    // tab 可关闭下拉列表
    if (e.keyCode === 9 || e.code === 'Tab') {
      onBlur?.(e);
      if (open) closePop();
      return;
    }

    if (!open) return;

    setControlType('keyboard');

    switch (e.keyCode || e.code) {
      case 38 || 'ArrowUp':
        if (optionListRef.current?.hoverHover) optionListRef.current?.hoverMove(-1);
        e.preventDefault();
        break;
      case 40 || 'ArrowDown':
        if (optionListRef.current?.hoverHover) optionListRef.current?.hoverMove(1);
        e.preventDefault();
        break;
      case 13 || 'Enter':
        handleEnter();
        e.preventDefault();
        e.stopPropagation();
        break;
      case 8 || 'Backspace':
        handleDelete(e);
        break;
      // default:
      //   this.lastChangeIsOptionClick = false
    }
  };

  const handleKeyUp = () => {};

  const getRenderResult = (data: DataItem, index?: number) => {
    if (!renderResultProp) return renderItem(data, index);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data, index)
      : data[renderResultProp];
  };

  // innerTitle 模式
  const renderInnerTitle = useInnerTitle({
    open: open || !!value,
    size,
    jssStyle,
    innerTitle,
  });

  const renderClearable = () => {
    return <span className={styles.clearIcon}>{Icons.PcCloseCircleFill}</span>;
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result
          jssStyle={jssStyle}
          size={size}
          datum={datum}
          value={value}
          data={groupBy ? groupData : filterData}
          focus={open}
          keygen={keygen}
          disabled={disabled}
          compressed={compressed}
          compressedBound={compressedBound}
          compressedClassName={compressedClassName}
          multiple={multiple}
          placeholder={placeholder}
          prediction={prediction}
          renderItem={renderItem}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
          allowOnFilter={'onFilter' in props}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          onFilter={onFilter}
          onRef={inputRef}
          onCreate={onCreate}
          onInputBlur={handleInputBlur}
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
      data: groupBy ? groupData : filterData,
      datum,
      value,
      size,
      originalData: data,
      filterData,
      keygen,
      width,
      height,
      jssStyle,
      multiple,
      optionWidth,
      groupKey,
      lineHeight,
      columnsTitle,
      columnWidth,
      itemsInView,
      renderItem,
      controlType,
      onControlTypeChange: setControlType,
      closePop,
      optionListRef,
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

  const getAutoAdaptStyle = () => {
    const style: React.CSSProperties = {};
    if (autoAdapt) {
      style.minWidth = '100%';
      return style;
    } else {
      if (columns > 1) {
        style.width = columns * columnWidth;
      } else {
        style.width = '100%';
      }
    }

    return style;
  };

  return (
    <div
      ref={selectRef}
      tabIndex={disabled === true ? -1 : 0}
      data-soui-type={'input'}
      className={rootClass}
      style={rootStyle}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {renderResult()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth={autoAdapt ? 'min' : true}
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
          type='scale-y'
          duration={'fast'}
          style={getAutoAdaptStyle()}
        >
          {renderOptions()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default Select;
