import React, { ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  util,
  usePersistFn,
  usePopup,
  useSelect,
  useFilter,
  useGroup,
  UnMatchedData,
  ObjectKey,
  useTiled,
} from '@sheinx/hooks';
import { SelectClasses } from './select.type';
import { SelectPropsBase, OptionListRefType } from './select.type';
import { AbsoluteList } from '../absolute-list';
import useInnerTitle from '../common/use-inner-title';
import AnimationList from '../animation-list';
import Spin from '../spin';
import Result from './result';
import List from './list';
import TreeList from './list-tree';
import Icons from '../icons';
import ColumnsList from './list-columns';
import useWithFormConfig from '../common/use-with-form-config';
import useTip from '../common/use-tip';
import { getLocale, useConfig } from '../config';

const preventDefault = (e: React.MouseEvent) => {
  e.preventDefault();
};

function Select<DataItem, Value>(props0: SelectPropsBase<DataItem, Value>) {
  const props = useWithFormConfig(props0);
  const { locale } = useConfig();
  const {
    jssStyle,
    className,
    size,
    data,
    treeData,
    header,
    footer,
    format,
    value: valueProp,
    defaultValue,
    prediction,
    innerTitle,
    underline,
    border = true,
    columns = 1,
    columnsTitle,
    columnWidth = 160,
    width,
    trim,
    maxLength,
    style,
    multiple,
    loading,
    convertBr,
    keygen,
    focusSelected = true,
    optionWidth,
    height = 250,
    open: openProp,
    position: positionProp = 'bottom-left',
    lineHeight,
    itemsInView,
    showArrow = true,
    disabled,
    separator,
    clearable = false,
    beforeChange,
    compressed,
    compressedBound,
    compressedClassName,
    placeholder,
    emptyAfterSelect,
    autoAdapt,
    groupBy,
    renderItem: renderItemProp = (d) => d as ReactNode,
    renderResult: renderResultProp,
    renderUnmatched,
    resultClassName,
    hideCreateOption,
    filterSingleSelect,
    childrenKey = 'children' as ObjectKey<DataItem>,
    expanded: expandedProp,
    defaultExpanded,
    defaultExpandAll,
    showHitDescendants,
    renderOptionList,
    // onAdvancedFilter,
    onExpand,
    onChange,
    onCreate: onCreateProp,
    onFilter: onFilterProp,
    onBlur,
    onFocus,
    onCollapse: onCollapseProp,
    onEnterExpand,
    onFilterWidthCreate,
    filterSameChange,
  } = props;

  const hasFilter = util.isFunc(props.onAdvancedFilter || onFilterProp);
  const showInput = hasFilter || util.isFunc(onCreateProp);

  const styles = jssStyle?.select?.() as SelectClasses;
  const rootStyle: React.CSSProperties = Object.assign({ width }, style);

  const [controlType, setControlType] = useState<'mouse' | 'keyboard'>('keyboard');
  const [focused, setFocused] = useState(false);

  const isPreventBlur = useRef(false);
  const blurEvent = useRef<(() => void) | null>();
  const inputRef = useRef<HTMLInputElement>();
  const optionListRef = useRef<OptionListRefType>();

  const {
    filterText,
    inputText,
    filterData: filterData0,
    createdData,
    expanded,
    onFilter: onFilter0,
    onCreate,
    onClearCreatedData,
    rawData,
  } = useFilter({
    data,
    treeData,
    keygen,
    childrenKey,
    expanded: expandedProp,
    showHitDescendants,
    hideCreateOption,
    onAdvancedFilter: 'onAdvancedFilter' in props,
    onCreate: onCreateProp,
    onFilter: props.onAdvancedFilter || onFilterProp,
    onFilterWidthCreate,
    filterDelay: props.filterDelay,
  });

  const onCollapse = usePersistFn((collapse: boolean) => {
    onCollapseProp?.(collapse);

    if (isPreventBlur.current) {
      isPreventBlur.current = false;
      return;
    }

    if (blurEvent.current && !collapse) {
      blurEvent.current();
      blurEvent.current = null;
    }
    onClearCreatedData();
  });

  const renderMoreIcon = () => {
    return Icons.More;
  };

  const {
    data: filterData,
    onFilter,
    expandIcons: tiledExpandIcons,
  } = useTiled<DataItem>({
    data: filterData0!,
    filterText,
    onAdvancedFilter: props.onAdvancedFilter,
    keygen: keygen as any,
    originIcon: Icons.More,
    moreIcon: renderMoreIcon,
    childrenKey,
    expanded,
    rawData: rawData!,
    onFilter: onFilter0,
  });

  const {
    open,
    position,
    targetRef,
    popupRef,
    openPop,
    closePop,
    Provider: PopupProvider,
    providerValue: popupProviderValue,
  } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp,
  });

  const handleSelectChange = usePersistFn((value: Value, dataItem: any, checked?: boolean) => {
    if (createdData || props.emptyAfterSelect) {
      onFilter?.('');
    }
    const shouldFocus = showInput && props.reFocus;
    if (!multiple && !shouldFocus) {
      closePop();
    }
    if (multiple && !shouldFocus) {
      inputRef?.current?.select();
    }
    onChange?.(value, dataItem, checked);
  });

  const { datum, value } = useSelect<DataItem, Value>({
    value: valueProp,
    data,
    separator,
    treeData,
    childrenKey,
    multiple,
    defaultValue,
    control: 'value' in props,
    format,
    disabled,
    groupBy,
    prediction,
    beforeChange,
    onChange: handleSelectChange,
    filterSameChange,
  });

  const checkEmpty = () => {
    let isEmpty;
    if (multiple) {
      isEmpty = !value || (Array.isArray(value) && value.length === 0);
    } else {
      isEmpty = util.isEmpty(value);
    }

    return isEmpty;
  };

  const isEmpty = checkEmpty();

  const { data: groupData, groupKey } = useGroup({
    data: filterData,
    groupBy,
  });

  // const triggerOpen = usePersistFn(() => {
  //   if (disabled === true) return;
  //   if (open) {
  //     closePop();
  //   } else {
  //     openPop();
  //   }
  // });

  const focusAndOpen = () => {
    if (!focused) {
      inputRef.current?.focus();
    } else {
      openPop();
    }
  };

  // 点击 Select 结果框的处理方法
  const handleResultClick = usePersistFn((e) => {
    if (disabled === true) return;
    if (!focus) {
      inputRef.current?.focus();
    }
    if (open) {
      if (e.target.tagName === 'INPUT') {
        return;
      }
      closePop();
    } else {
      openPop();
    }
  });

  const tipNode = useTip({
    popover: props.popover,
    popoverProps: props.popoverProps,
    error: props.error,
    tip: props.tip,
    focused,
    rootRef: targetRef,
    jssStyle: props.jssStyle,
  });

  const rootClass = classNames(
    className,
    isEmpty && styles.wrapperEmpty,
    styles?.wrapper,
    open && styles?.wrapperOpen,
    disabled === true && styles?.wrapperDisabled,
    disabled !== true && focused && styles?.wrapperFocus,
    innerTitle && styles?.wrapperInnerTitle,
    size === 'small' && styles?.wrapperSmall,
    size === 'large' && styles?.wrapperLarge,
    (!!props.error || props.status === 'error') && styles?.wrapperError,
    clearable && styles?.clearable,
    !border && styles?.wrapperNoBorder,
    !!underline && styles?.wrapperUnderline,
    {
      [styles?.multiple]: multiple,
    },
  );

  const getRenderItem = (data: DataItem, index?: number) => {
    return typeof renderItemProp === 'function'
      ? renderItemProp(data, index)
      : (data[renderItemProp] as ReactNode);
  };

  const renderItem = getRenderItem;

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
      if (datum.isUnMatchedData(item)) {
        datum.remove(item);
      } else {
        const checked = datum.check(item);
        if (checked) datum.remove(item);
        else datum.add(item);
      }
    } else {
      const checked = datum.check(item);
      if (!checked) datum.add(item);
    }
  };

  // 回车时的处理方法
  const handleEnter = () => {
    const hoverIndex = optionListRef.current?.getHoverIndex() || 0;
    if (onCreate && createdData) {
      if (hideCreateOption) {
        handleChange(createdData as DataItem);
        return;
      }
    }
    const currentDataItem = filterData?.[hoverIndex];
    if (currentDataItem && !currentDataItem[groupKey as keyof typeof currentDataItem]) {
      handleChange(currentDataItem);
    }
  };

  // input blur 时的处理方法
  // 注意，在点击 option 的时候也会触发 blur 事件，此时要规避点击 option 后的 blur 事件
  const handleInputBlur = (text?: string) => {
    // 当筛选数据仅为一条时，失焦后直接选中该条数据仅在 Filter 下有效
    if (onFilterProp && text && filterSingleSelect && filterData?.length === 1) {
      datum.add(filterData[0]);
      return;
    }
    if (!onCreate) return;
    if (multiple && !text) return;
    // 防止点击 option 后触发 blur 事件，先把要做的事情存起来，后面再看要不要执行
    blurEvent.current = () => {
      if (createdData) {
        handleChange(createdData as DataItem);
      }
      onClearCreatedData();
    };
  };

  const handleFilter = (text: string, from?: string) => {
    const hideCreate = onCreate && hideCreateOption;
    if (from !== 'blur') {
      focusAndOpen();
    }
    if (onCreate && !hideCreateOption) {
      optionListRef.current?.hoverMove(0, true);
    }
    if (hideCreate) {
      // optionListRef.current?.hoverMove(filterData.length - 1, true);
    }

    onFilter?.(trim ? text.trim() : text, from);
  };

  const handleOptionClick = () => {
    isPreventBlur.current = true;
    if (multiple) return;
    // 单选结束后需要清除创建项
    onClearCreatedData();
  };

  // 退格键可删除选项，仅在多选模式下生效
  const handleDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!multiple) return;
    if (inputText) return;
    e.preventDefault();

    const raws = Array.isArray(value) ? value : [value];
    const values = [...raws];
    const last = values.pop();

    if (last) {
      datum.remove(last);
    }
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
      focusAndOpen();
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
    }
  };

  const handleKeyUp = () => {};

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    datum.removeAll();
    if (filterText) {
      onFilter?.('');
    }

    if (open) closePop();
  };

  const getRenderResult = (data: DataItem, index?: number) => {
    if (!renderResultProp) return renderItem(data, index);
    return typeof renderResultProp === 'function'
      ? renderResultProp(data, index)
      : data[renderResultProp];
  };

  const getDataByValues = (values: Value) => {
    return datum.getDataByValues(values as Value[], { childrenKey });
  };

  const checkUnMatched = (item: DataItem | UnMatchedData): item is UnMatchedData => {
    return datum.isUnMatchedData(item);
  };
  const handleRemove = (item: DataItem | UnMatchedData) => {
    return datum.remove(item);
  };

  // innerTitle 模式
  const renderInnerTitle = useInnerTitle({
    open: open || !isEmpty,
    size,
    jssStyle,
    innerTitle,
  });

  const renderClearable = () => {
    if (!multiple !== undefined && !showArrow) return null;
    const defaultIcon = multiple ? Icons.More : Icons.ArrowDown;
    const arrow = (
      <span
        className={classNames(styles.arrowIcon, open && !compressed && styles.arrowIconOpen)}
        onClick={handleResultClick}
      >
        {defaultIcon}
      </span>
    );

    const close = (
      <span className={styles.clearIcon} onClick={handleClear}>
        {isEmpty ? arrow : Icons.PcCloseCircleFill}
      </span>
    );
    return (
      <>
        {close}
        {!open && arrow}
      </>
    );
  };

  const renderIcon = () => {
    if (clearable && !isEmpty && disabled !== true) {
      return renderClearable();
    }
    if (!multiple && !showArrow) return null;
    const defaultIcon = multiple ? Icons.More : Icons.ArrowDown;
    return (
      <span
        className={classNames(styles.arrowIcon, open && !compressed && styles.arrowIconOpen)}
        onClick={handleResultClick}
      >
        {defaultIcon}
      </span>
    );
  };

  const renderResult = () => {
    const result = (
      <div className={classNames(styles?.result)}>
        <Result<DataItem, Value>
          trim={trim}
          jssStyle={jssStyle}
          size={size}
          separator={separator}
          value={value}
          data={(groupBy ? groupData : filterData) as DataItem[]}
          focus={open}
          keygen={keygen}
          disabled={disabled}
          maxLength={maxLength}
          convertBr={convertBr}
          compressed={compressed}
          compressedBound={compressedBound}
          compressedClassName={compressedClassName}
          multiple={multiple}
          placeholder={placeholder}
          renderItem={renderItem}
          childrenKey={childrenKey}
          renderResult={getRenderResult}
          resultClassName={resultClassName}
          renderUnmatched={renderUnmatched}
          allowOnFilter={showInput}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          onFilter={handleFilter}
          onRef={inputRef}
          onCreate={onCreate}
          onInputBlur={handleInputBlur}
          onClearCreatedData={onClearCreatedData}
          getDataByValues={getDataByValues}
          checkUnMatched={checkUnMatched}
          onRemove={handleRemove}
        ></Result>
      </div>
    );

    return (
      <PopupProvider value={popupProviderValue}>
        <div
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
      </PopupProvider>
    );
  };

  const renderList = () => {
    const listProps = {
      data: (groupBy ? groupData : filterData) as DataItem[],
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
      emptyAfterSelect,
      renderItem,
      controlType,
      onControlTypeChange: setControlType,
      closePop,
      optionListRef,
      onOptionClick: handleOptionClick,
    };
    // 自定义列
    if (('columns' in props && typeof columns === 'number' && columns! >= 1) || columns === -1) {
      return <ColumnsList columns={columns} {...listProps}></ColumnsList>;
    }

    return <List {...listProps}></List>;
  };

  const renderTreeList = () => {
    return (
      <TreeList<DataItem, Value>
        jssStyle={jssStyle}
        data={filterData as DataItem[]}
        datum={datum}
        expanded={'expanded' in props || expanded?.length ? expanded : undefined}
        multiple={multiple}
        keygen={keygen}
        height={height as number}
        defaultExpandAll={defaultExpandAll}
        defaultExpanded={defaultExpanded}
        onExpand={onExpand}
        childrenKey={childrenKey}
        closePop={closePop}
        renderItem={renderItem}
        expandIcons={tiledExpandIcons}
      ></TreeList>
    );
  };

  const renderLoading = () => {
    if (loading !== true) {
      return loading;
    }

    return (
      <div className={styles?.loading}>
        <Spin jssStyle={jssStyle} size={14}></Spin>
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div className={styles?.option}>
        <div className={styles?.optionInner}>
          <span className={styles?.empty}>{props.emptyText || getLocale(locale, 'noData')}</span>
        </div>
      </div>
    );
  };

  const renderOptions = () => {
    if (loading) return renderLoading();

    const isEmpty = !filterData?.length;
    if (isEmpty) return renderEmpty();

    const options = 'treeData' in props ? renderTreeList() : renderList();
    if (renderOptionList) {
      return renderOptionList(options, { loading: loading });
    }

    return options;
  };

  const renderHeader = () => {
    if (!header) return null;
    return header;
  };

  const renderFooter = () => {
    if (!footer) return null;
    return footer;
  };

  const getListStyle = () => {
    const style: React.CSSProperties = {};
    {
      if (columns > 1) {
        style.width = columns * columnWidth;
      } else if (optionWidth) {
        style.width = optionWidth;
      }
    }

    return style;
  };
  return (
    <div
      ref={targetRef}
      tabIndex={disabled === true || showInput ? undefined : 0}
      {...util.getDataAttribute({ ['input-border']: 'true' })}
      className={rootClass}
      style={rootStyle}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseDown={(e) => {
        if (focused && e.target !== inputRef.current) {
          e.preventDefault();
        }
      }}
    >
      {tipNode}
      {renderResult()}
      {renderIcon()}
      <AbsoluteList
        adjust
        focus={open}
        fixedWidth={autoAdapt ? 'min' : true}
        absolute={props.absolute}
        zIndex={props.zIndex}
        position={position}
        popupGap={4}
        popupElRef={popupRef}
        parentElRef={targetRef}
      >
        <AnimationList
          onRef={popupRef}
          show={open}
          className={classNames(styles?.pickerWrapper)}
          onMouseDown={preventDefault}
          display={'block'}
          type='scale-y'
          duration={'fast'}
          style={getListStyle()}
        >
          {renderHeader()}
          {renderOptions()}
          {renderFooter()}
        </AnimationList>
      </AbsoluteList>
    </div>
  );
}

export default Select;
