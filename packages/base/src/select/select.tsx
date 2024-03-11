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
} from '@sheinx/hooks';
import { SelectClasses } from '@sheinx/shineout-style';
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
    keygen,
    focusSelected = true,
    optionWidth = '100%',
    height = 250,
    open: openProp,
    position: positionProp = 'bottom-left',
    lineHeight,
    itemsInView,
    showArrow = true,
    disabled,
    separator,
    clearable = true,
    beforeChange,
    compressed,
    compressedBound,
    compressedClassName,
    placeholder,
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
  } = props;

  const styles = jssStyle?.select?.() as SelectClasses;
  const rootStyle: React.CSSProperties = Object.assign({ width }, style);

  const [controlType, setControlType] = useState<'mouse' | 'keyboard'>('keyboard');
  const [focused, setFocused] = useState(false);
  const [enter, setEnter] = useState(false);

  const isKeydown = useRef(false);
  const isPreventBlur = useRef(false);
  const blurEvent = useRef<(() => void) | null>();
  const inputRef = useRef<HTMLInputElement>();
  const selectRef = useRef<any>();
  const optionListRef = useRef<OptionListRefType>();

  const {
    filterText,
    inputText,
    filterData,
    createdData,
    expanded,
    setInputText,
    onFilter,
    onResetFilter,
    onCreate,
    onClearCreatedData,
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
    onFilter: onFilterProp,
    onFilterWidthCreate,
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
    onChange,
  });

  const { data: groupData, groupKey } = useGroup({
    data: filterData,
    groupBy,
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

  const { open, position, targetRef, popupRef, openPop, closePop } = usePopup({
    open: openProp,
    onCollapse: onCollapse,
    disabled: false,
    trigger: 'click',
    position: positionProp,
  });

  const tipNode = useTip({
    popover: props.popover,
    popoverProps: props.popoverProps,
    error: props.error,
    tip: props.tip,
    focused,
    rootRef: selectRef,
    jssStyle: props.jssStyle,
  });

  const rootClass = classNames(
    className,
    styles?.wrapper,
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

    const checked = datum.check(item);
    if (!checked) datum.add(item);

    inputRef.current?.blur();

    if (!multiple) {
      closePop();
      onClearCreatedData();
    }

    // 单选模式下，关闭列表后需要聚焦外层容器，以便继续键盘操作
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  // 点击 Select 结果框的处理方法
  const handleResultClick = usePersistFn(() => {
    if (disabled === true) return;
    if (!open) {
      openPop();
      inputRef.current?.focus();
    } else {
      closePop();
      inputRef.current?.blur();
    }
  });

  // 创建选项时，开启隐藏创建项目后的处理方法
  const handleHideOption = () => {
    handleChange(createdData as DataItem);
  };

  // 回车时的处理方法
  const handleEnter = () => {
    const hoverIndex = optionListRef.current?.getHoverIndex() || 0;
    if (onCreate && hideCreateOption && createdData) {
      handleHideOption();
      setInputText('');
      return;
    }

    const currentDataItem = filterData?.[hoverIndex];
    if (currentDataItem && !currentDataItem[groupKey as keyof typeof currentDataItem]) {
      isKeydown.current = true;
      handleChange(currentDataItem);
      setInputText('');
    }
  };

  // input blur 时的处理方法
  // 注意，在点击 option 的时候也会触发 blur 事件，此时要规避点击 option 后的 blur 事件
  const handleInputBlur = (text?: string) => {
    if (onFilterProp && text && filterSingleSelect && data?.length === 1) {
      handleChange(data[0]);
      return;
    }
    if (!onCreate) return;
    if (multiple && !text) return;
    if (isKeydown.current) {
      isKeydown.current = false;
      return;
    }
    // 防止点击 option 后触发 blur 事件，先把要做的事情存起来，后面再看要不要执行
    blurEvent.current = () => {
      if (createdData) {
        handleChange(createdData as DataItem);
      }
      onClearCreatedData();
    };
  };

  const handleFilter = (text: string) => {
    const hideCreate = onCreate && hideCreateOption;

    if (onCreate && !hideCreateOption) {
      optionListRef.current?.hoverMove(0, true);
    }
    if (hideCreate) {
      // optionListRef.current?.hoverMove(filterData.length - 1, true);
    }

    onFilter?.(trim ? text.trim() : text);
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

  const handleMouseEnter = () => {
    setEnter(true);
  };

  const handleMouseLeave = () => {
    setEnter(false);
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
    }
  };

  const handleKeyUp = () => {};

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    datum.removeAll();
    setInputText('');

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

  // innerTitle 模式
  const renderInnerTitle = useInnerTitle({
    open: open || !!value,
    size,
    jssStyle,
    innerTitle,
  });

  const renderClearable = () => {
    return (
      <span className={styles.clearIcon} onClick={handleClear}>
        {Icons.PcCloseCircleFill}
      </span>
    );
  };

  const renderIcon = () => {
    let isEmpty;
    if (multiple) {
      isEmpty = !value || (Array.isArray(value) && value.length === 0);
    } else {
      isEmpty = util.isEmpty(value);
    }

    if ((clearable && !isEmpty && open) || (clearable && !isEmpty && enter && disabled !== true)) {
      return renderClearable();
    }
    if (!multiple && !showArrow) return null;
    const defaultIcon = compressed ? Icons.More : Icons.ArrowDown;
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
          allowOnFilter={'onFilter' in props || 'onCreate' in props}
          focusSelected={focusSelected}
          inputText={inputText}
          filterText={filterText}
          setInputText={setInputText}
          onFilter={handleFilter}
          onRef={inputRef}
          onCreate={onCreate}
          onInputBlur={handleInputBlur}
          onResetFilter={onResetFilter}
          onClearCreatedData={onClearCreatedData}
          getDataByValues={getDataByValues}
          checkUnMatched={checkUnMatched}
          onRemove={handleRemove}
        ></Result>
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
        multiple={multiple}
        keygen={keygen}
        allowOnFilter={'onFilter' in props}
        height={height as number}
        defaultExpandAll={defaultExpandAll}
        defaultExpanded={defaultExpanded}
        expanded={expanded}
        onExpand={onExpand}
        childrenKey={childrenKey}
        closePop={closePop}
        renderItem={renderItem}
      ></TreeList>
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

    const isEmpty = !props.treeData?.length && !props.data?.length;
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
    if (autoAdapt) {
      if (width) {
        style.minWidth = width || 'auto';
      } else {
        style.width = width || 'auto';
      }
      return style;
    } else {
      if (columns > 1) {
        style.width = columns * columnWidth;
      } else {
        style.width = ('optionWidth' in props ? optionWidth : undefined) || width || '100%';
      }
    }

    return style;
  };

  return (
    <div
      ref={selectRef}
      tabIndex={disabled === true ? -1 : 0}
      {...util.getDataAttribute({ ['input-border']: 'true' })}
      className={rootClass}
      style={rootStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      onFocus={handleFocus}
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
